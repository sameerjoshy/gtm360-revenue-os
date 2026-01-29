"""
Simple test runner to identify failing test
"""
import os
import sys
from dotenv import load_dotenv

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

load_dotenv()

# Import test functions
from test_phase1_validation import (
    test_a1_migration_complete,
    test_a2_grant_revoke,
    test_a3_rls_active,
    test_a4_immutability_triggers,
    test_a5_no_invariant_mutation,
    test_b1_cross_workspace_reads,
    test_b2_cross_workspace_writes,
    test_b3_mismatched_account_workspace,
    test_b4_mismatched_run_workspace,
    test_c1_same_idempotency_key,
    test_c2_changed_inputs_same_key,
    test_c3_no_duplicate_runs,
    test_d_agent_runtime,
    test_e_ui_runtime
)

tests = [
    ("A1: Migration complete", test_a1_migration_complete),
    ("A2: Grant/Revoke", test_a2_grant_revoke),
    ("A3: RLS active", test_a3_rls_active),
    ("A4: Immutability triggers", test_a4_immutability_triggers),
    ("A5: No invariant mutation", test_a5_no_invariant_mutation),
    ("B1: Cross-workspace reads", test_b1_cross_workspace_reads),
    ("B2: Cross-workspace writes", test_b2_cross_workspace_writes),
    ("B3: Mismatched account/workspace", test_b3_mismatched_account_workspace),
    ("B4: Mismatched run/workspace", test_b4_mismatched_run_workspace),
    ("C1: Same idempotency key", test_c1_same_idempotency_key),
    ("C2: Changed inputs same key", test_c2_changed_inputs_same_key),
    ("C3: No duplicate runs", test_c3_no_duplicate_runs),
    ("D: Agent runtime", test_d_agent_runtime),
    ("E: UI runtime", test_e_ui_runtime),
]

print("Running tests individually...")
print("=" * 60)

passed = 0
failed = 0
failed_tests = []

for name, test_func in tests:
    try:
        result = test_func()
        if result:
            print(f"PASS: {name}")
            passed += 1
        else:
            print(f"FAIL: {name}")
            failed += 1
            failed_tests.append(name)
    except Exception as e:
        print(f"ERROR: {name} - {str(e)[:100]}")
        failed += 1
        failed_tests.append(name)

print("=" * 60)
print(f"PASSED: {passed}/{len(tests)}")
print(f"FAILED: {failed}/{len(tests)}")

if failed_tests:
    print("\nFailed tests:")
    for test in failed_tests:
        print(f"  - {test}")
