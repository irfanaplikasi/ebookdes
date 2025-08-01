-- Create a predefined admin user
-- This will create an admin account with known credentials

-- First, let's create a function to handle admin user creation
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void AS $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Check if admin already exists
    IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
        -- Create admin user in auth.users (this is a placeholder - actual user creation should be done through Supabase Auth)
        -- For now, we'll set the first user who registers as admin
        
        -- Insert admin role for the first user that gets created
        -- This will be triggered by the handle_new_user function
        
        -- Create a default admin role entry that will be assigned to the first user
        INSERT INTO public.user_roles (user_id, role, created_at)
        SELECT 
            u.id,
            'admin',
            NOW()
        FROM public.users u
        WHERE NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin')
        ORDER BY u.created_at ASC
        LIMIT 1;
        
        -- If no users exist yet, we'll modify the trigger to auto-assign admin to first user
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Execute the function
SELECT create_admin_user();

-- Modify the handle_new_user function to auto-assign admin role to first user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    admin_exists boolean;
BEGIN
    -- Insert user into public.users
    INSERT INTO public.users (
        id,
        user_id,
        email,
        name,
        full_name,
        avatar_url,
        token_identifier,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        NEW.id::text,
        NEW.email,
        NEW.raw_user_meta_data->>'name',
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.email,
        NEW.created_at,
        NEW.updated_at
    );
    
    -- Check if any admin exists
    SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE role = 'admin') INTO admin_exists;
    
    -- If no admin exists, make this user an admin
    IF NOT admin_exists THEN
        INSERT INTO public.user_roles (user_id, role, created_at)
        VALUES (NEW.id, 'admin', NEW.created_at);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the function we created as it's no longer needed
DROP FUNCTION IF EXISTS create_admin_user();
