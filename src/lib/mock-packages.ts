import type { Package } from "@/types/database";

const now = new Date().toISOString();

export const MOCK_PACKAGES: Package[] = [
  {
    id: "mock-1",
    name: "1 Month Coaching",
    price: 149,
    duration_label: "1 Month",
    duration_days: 30,
    description: "Perfect to try the system and build first momentum.",
    features: [
      "Custom workout plan",
      "Custom nutrition plan",
      "Progress check-ins",
      "Private client portal access",
    ],
    is_active: true,
    sort_order: 1,
    created_at: now,
    updated_at: now,
  },
  {
    id: "mock-2",
    name: "3 Month Transformation",
    price: 379,
    duration_label: "3 Months",
    duration_days: 90,
    description: "The sweet spot for real, visible transformation.",
    features: [
      "Custom workout plan",
      "Custom nutrition plan",
      "Progress tracking & adjustments",
      "Priority support",
      "Private client portal access",
    ],
    is_active: true,
    sort_order: 2,
    created_at: now,
    updated_at: now,
  },
  {
    id: "mock-3",
    name: "6 Month Elite",
    price: 699,
    duration_label: "6 Months",
    duration_days: 180,
    description: "Full commitment coaching for maximum, lasting results.",
    features: [
      "Custom workout plan",
      "Custom nutrition plan",
      "Bi-weekly plan adjustments",
      "Priority support",
      "Private client portal access",
      "Best value per month",
    ],
    is_active: true,
    sort_order: 3,
    created_at: now,
    updated_at: now,
  },
];
