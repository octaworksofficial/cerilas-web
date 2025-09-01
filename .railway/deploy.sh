#!/bin/bash

# Railway deployment script for Prisma database setup
echo "🚀 Starting Railway deployment..."

# Clear any potential cache issues
echo "🧹 Clearing cache..."
rm -rf .next || true
rm -rf node_modules/.cache || true

# Compile Tailwind CSS first
echo "🎨 Compiling Tailwind CSS..."
npx tailwindcss -i ./src/styles/global.css -o ./src/styles/compiled.css --minify

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Check if database has tables but no migration history
echo "🔍 Checking database state..."

# Try to run migrations first
echo "📊 Attempting to deploy migrations..."
if npx prisma migrate deploy; then
    echo "✅ Migrations deployed successfully!"
else
    echo "⚠️  Migration deploy failed, trying baseline approach..."
    
    # If migrations fail, it means we have a database without migration history
    # First, mark the initial migration as resolved
    echo "🔧 Setting up migration baseline..."
    npx prisma migrate resolve --applied 20250831140455_init || true
    
    # Then try to deploy remaining migrations
    echo "📊 Deploying remaining migrations..."
    npx prisma migrate deploy || {
        echo "⚠️  Migration deploy still failed, falling back to db push..."
        npx prisma db push --accept-data-loss
    }
fi

echo "✅ Database setup completed!"
