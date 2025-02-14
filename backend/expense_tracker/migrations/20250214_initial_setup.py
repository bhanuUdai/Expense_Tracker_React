from django.db import migrations

class Migration(migrations.Migration):

    dependencies = []

    operations = [
        migrations.RunSQL(
            """
            CREATE SCHEMA IF NOT EXISTS public;
            CREATE SCHEMA IF NOT EXISTS expense;
            CREATE SCHEMA IF NOT EXISTS user_profile;

            CREATE TABLE IF NOT EXISTS public.users (
                id SERIAL PRIMARY KEY,
                firebase_uid VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS expense.expenses (
                id SERIAL PRIMARY KEY,
                amount DECIMAL(10,2) NOT NULL,
                description TEXT,
                category VARCHAR(50),
                project_id INTEGER,
                created_at TIMESTAMP NOT NULL DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS user_profile.profile (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                profile_photo TEXT,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                user_id INTEGER REFERENCES public.users(id) ON DELETE CASCADE
            );
            """,
            reverse_sql="""
            DROP TABLE IF EXISTS user_profile.profile;
            DROP TABLE IF EXISTS expense.expenses;
            DROP TABLE IF EXISTS public.users;
            DROP SCHEMA IF EXISTS user_profile;
            DROP SCHEMA IF EXISTS expense;
            DROP SCHEMA IF EXISTS public;
            """
        ),
    ]
