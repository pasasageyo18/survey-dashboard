export const surveyQuestionJson = {
  title: "Customer Satisfactory",
  description:
    "This is a survey for our customer satisfaction! Please tell us the truth about our cafe!",
  logoPosition: "right",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "text",
          name: "name",
          title: "Your Name",
          isRequired: true,
          requiredErrorText: "Please tell us your name!",
        },
        {
          type: "text",
          name: "email",
          title: "Your Email",
          isRequired: true,
        },
        {
          type: "radiogroup",
          name: "whereInfo",
          title: "How do you know about our cafe?",
          isRequired: true,
          commentText: "Why",
          choices: [
            "Found it on Instagram",
            "Referred by a friend",
            "See the ads",
            "Randomly",
          ],
        },
        {
          type: "radiogroup",
          name: "howOften",
          title: "How many often you come to our cafe in a week?",
          isRequired: true,
          choices: ["Once", "Around 2-4 days", "Around 5-7 days", "Everyday"],
        },
        {
          type: "dropdown",
          name: "favoriteBeverage",
          title: "Pick one of our beverages that you like the most!",
          isRequired: true,
          choices: ["Matcha Latte", "Coffee Milk", "Thai Tea", "Moccacino"],
        },
        {
          type: "text",
          name: "reason",
          title: "Tell us why you like that drink!",
        },
        {
          type: "boolean",
          name: "recommend",
          title: "Would you recommend that beverage to your friend?",
        },
        {
          type: "radiogroup",
          name: "interior",
          title: "What do you think about our interior design?",
          isRequired: true,
          choices: ["It's super cool!", "Nothing special...", "Bad"],
        },
        {
          type: "text",
          name: "badReason",
          visibleIf: "{interior} = 'Bad'",
          title: "Tell us why",
        },
        {
          type: "rating",
          name: "serviceRate",
          title: "How would you rate about our service?",
          isRequired: true,
        },
        {
          type: "text",
          name: "review",
          title: "Write your honest review about our cafe if you don't mind!",
        },
      ],
    },
  ],
};
