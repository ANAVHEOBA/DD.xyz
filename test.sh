#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Testing Authentication Endpoints${NC}\n"

# Base URL
BASE_URL="http://localhost:5000/api/auth"

# Test Registration
echo -e "${GREEN}1. Testing Registration:${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/register" \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Test",
  "lastName": "User"
}')
echo $REGISTER_RESPONSE
echo -e "\n"

# Test Login
echo -e "${GREEN}2. Testing Login:${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/login" \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "password": "password123"
}')
echo $LOGIN_RESPONSE
echo -e "\n"

# Extract token from login response
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | grep -o '[^"]*$')

if [ -z "$TOKEN" ]
then
    echo -e "${RED}No token received from login${NC}"
    exit 1
fi

# Test Profile with token
echo -e "${GREEN}3. Testing Protected Profile Endpoint:${NC}"
PROFILE_RESPONSE=$(curl -s "$BASE_URL/profile" \
-H "Authorization: Bearer $TOKEN")
echo $PROFILE_RESPONSE
echo -e "\n"

echo -e "${GREEN}Testing Complete!${NC}" 