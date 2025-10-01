import { Question } from "@/components/QuizQuestion";

export const questions: Question[] = [
  {
    id: "skin-type",
    title: "What's your skin type?",
    subtitle: "Understanding your skin type helps us recommend the right products.",
    type: "single",
    options: [
      {
        id: "oily",
        label: "Oily",
        description: "Shiny, large pores, prone to breakouts"
      },
      {
        id: "dry",
        label: "Dry",
        description: "Tight feeling, flaky, rough texture"
      },
      {
        id: "combination",
        label: "Combination",
        description: "Oily T-zone, dry cheeks"
      },
      {
        id: "normal",
        label: "Normal",
        description: "Balanced, not too oily or dry"
      },
      {
        id: "sensitive",
        label: "Sensitive",
        description: "Easily irritated, reactive to products"
      }
    ]
  },
  {
    id: "skin-concerns",
    title: "What are your main skin concerns?",
    subtitle: "Select all that apply. We'll prioritize these in your routine.",
    type: "multiple",
    options: [
      {
        id: "acne",
        label: "Acne & Breakouts",
        description: "Active breakouts, blackheads, whiteheads"
      },
      {
        id: "aging",
        label: "Anti-Aging",
        description: "Fine lines, wrinkles, loss of firmness"
      },
      {
        id: "hyperpigmentation",
        label: "Dark Spots",
        description: "Uneven skin tone, dark marks, melasma"
      },
      {
        id: "dullness",
        label: "Dullness",
        description: "Lack of radiance, uneven texture"
      },
      {
        id: "pores",
        label: "Large Pores",
        description: "Visible pores, rough texture"
      },
      {
        id: "redness",
        label: "Redness & Irritation",
        description: "Sensitive, inflamed, rosacea-prone"
      }
    ]
  },
  {
    id: "routine-time",
    title: "How much time do you want to spend on skincare?",
    subtitle: "We'll create a routine that fits your lifestyle.",
    type: "single",
    options: [
      {
        id: "minimal",
        label: "5 minutes or less",
        description: "Simple, essential steps only"
      },
      {
        id: "moderate",
        label: "10-15 minutes",
        description: "Balanced routine with key treatments"
      },
      {
        id: "extensive",
        label: "20+ minutes",
        description: "Complete multi-step routine"
      }
    ]
  },
  {
    id: "experience-level",
    title: "How experienced are you with skincare?",
    subtitle: "This helps us recommend products at the right complexity level.",
    type: "single",
    options: [
      {
        id: "beginner",
        label: "Beginner",
        description: "New to skincare, prefer simple routines"
      },
      {
        id: "intermediate",
        label: "Intermediate",
        description: "Some experience, willing to try new ingredients"
      },
      {
        id: "advanced",
        label: "Advanced",
        description: "Experienced with active ingredients and complex routines"
      }
    ]
  },
  {
    id: "budget",
    title: "What's your monthly skincare budget?",
    subtitle: "We'll recommend products within your price range.",
    type: "single",
    options: [
      {
        id: "budget",
        label: "Under $50",
        description: "Affordable drugstore options"
      },
      {
        id: "mid-range",
        label: "$50 - $150",
        description: "Mix of drugstore and mid-range brands"
      },
      {
        id: "premium",
        label: "$150+",
        description: "High-end and professional products"
      }
    ]
  },
  {
    id: "lifestyle",
    title: "Which describes your lifestyle best?",
    subtitle: "Your daily habits affect your skin's needs.",
    type: "single",
    options: [
      {
        id: "indoor",
        label: "Mostly indoors",
        description: "Office work, limited sun exposure"
      },
      {
        id: "outdoor",
        label: "Often outdoors",
        description: "Regular sun exposure, active lifestyle"
      },
      {
        id: "travel",
        label: "Frequent traveler",
        description: "Changing climates, need portable routine"
      },
      {
        id: "stress",
        label: "High stress",
        description: "Busy schedule, stress affects skin"
      }
    ]
  }
];