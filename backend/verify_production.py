"""
Production Deployment Verification Script
Tests the deployed GTM360 backend on Render
"""

import requests
import json

# Update this with your actual Render URL
RENDER_URL = "https://gtm360-revenue-os.onrender.com"  # Replace with your actual URL

def test_health():
    """Test the health endpoint"""
    print("\n" + "="*60)
    print("Testing Health Endpoint")
    print("="*60)
    
    try:
        response = requests.get(f"{RENDER_URL}/health", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200 and response.json().get("status") == "healthy":
            print("✅ Health check PASSED")
            return True
        else:
            print("❌ Health check FAILED")
            return False
    except Exception as e:
        print(f"❌ Health check ERROR: {str(e)}")
        return False

def test_webhook():
    """Test the HubSpot webhook endpoint"""
    print("\n" + "="*60)
    print("Testing Webhook Endpoint")
    print("="*60)
    
    payload = [{
        "objectId": 999999,
        "propertyName": "domain",
        "propertyValue": "deployment-test.com",
        "subscriptionType": "company.creation",
        "portalId": 12345
    }]
    
    try:
        response = requests.post(
            f"{RENDER_URL}/webhooks/hubspot/company",
            json=payload,
            timeout=30
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200 and response.json().get("status") == "ok":
            print("✅ Webhook test PASSED")
            print(f"   Triggered {response.json().get('triggered')} agent run(s)")
            return True
        else:
            print("❌ Webhook test FAILED")
            return False
    except Exception as e:
        print(f"❌ Webhook test ERROR: {str(e)}")
        return False

def main():
    print("\n" + "="*60)
    print("GTM360 Backend Deployment Verification")
    print("="*60)
    print(f"Testing: {RENDER_URL}")
    
    results = {
        "health": test_health(),
        "webhook": test_webhook()
    }
    
    print("\n" + "="*60)
    print("Verification Summary")
    print("="*60)
    
    for test, passed in results.items():
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"{test.upper()}: {status}")
    
    all_passed = all(results.values())
    
    if all_passed:
        print("\n🎉 All tests passed! Backend is deployed and working correctly.")
        print("\nNext steps:")
        print("1. Check Supabase for the agent_run record")
        print("2. Monitor Render logs for any errors")
        print("3. Set up HubSpot webhook to point to this URL")
    else:
        print("\n⚠️  Some tests failed. Check Render logs for errors.")
        print("\nTroubleshooting:")
        print("1. Verify SUPABASE_SERVICE_ROLE_KEY is set correctly")
        print("2. Check Render deployment logs for startup errors")
        print("3. Ensure all dependencies installed correctly")
    
    print("\n" + "="*60)

if __name__ == "__main__":
    main()
