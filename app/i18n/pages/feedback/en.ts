// Feedback page strings (English source of truth).
// Form option *values* sent to the backend live in the component; only the
// displayed labels are here.
export const en = {
  meta: {
    title: "Feedback - Share Your Thoughts",
    description:
      "Share your feedback with the Funlingo team. Help us build a better language learning experience for everyone.",
  },
  header: {
    title: "We'd Love Your Feedback",
    subtitle: "Your input helps us build a better language learning experience for everyone",
  },
  validation: {
    name: "Please enter your name.",
    email: "Please enter your email.",
    message: "Please enter your feedback.",
    uninstallReason: "Please select at least one uninstall reason.",
  },
  submitError: "Something went wrong. Please try again.",
  success: "Thank you for your feedback! We'll review it carefully.",
  form: {
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "your.email@example.com",
    categoryLabel: "Category",
    categories: {
      feature: "Feature Request",
      bug: "Bug Report",
      improvement: "Improvement Suggestion",
      uninstall: "Reason for Uninstalling",
      other: "Other",
    },
    satisfactionLabel: "Overall Satisfaction",
    satisfactionLevels: {
      1: "Very Dissatisfied",
      2: "Dissatisfied",
      3: "Neutral",
      4: "Satisfied",
      5: "Very Satisfied",
    },
    uninstall: {
      heading: "Why are you considering uninstalling?",
      missingFeatures: "Missing features I need",
      notWorking: "Not working properly",
      otherReasons: "Other reasons",
      otherPlaceholder: "Please specify other reasons...",
    },
    featureDetailsLabel: "Feature Details",
    desiredFeatureLabel: "Any Feature You'd Like Us to Build?",
    featureDetailsPlaceholder: "Describe the feature you'd like to see...",
    desiredFeaturePlaceholder: "What feature would make you reconsider?",
    recommendLabel: "Would you recommend Funlingo to others?",
    recommendOptions: {
      none: "Select an option",
      definitely: "Definitely yes",
      probably: "Probably yes",
      unsure: "Not sure",
      probablyNot: "Probably not",
      definitelyNot: "Definitely not",
    },
    commentsLabel: "Additional Comments",
    commentsPlaceholder: "Share any additional thoughts, suggestions, or details...",
    submitting: "Submitting...",
    submit: "Submit Feedback",
  },
  contact: {
    email: { title: "Email Us", description: "getfunlingo@gmail.com" },
    instagram: { title: "Instagram", description: "@getfunlingo" },
    linkedin: { title: "LinkedIn", description: "Follow our page" },
  },
};
