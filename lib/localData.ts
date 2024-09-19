export const localData = {
  AddOnInfoSchema: {
    task: 'marketing',
    difficulty: 'Medium',
  },
  questionSchema: [
    {
      id: '1a2b3c4d-5678-90ab-cdef-1234567890ab',
      title: 'What is SEO?',
      description:
        'Explain the term SEO and its importance in digital marketing.',
      version: 1,
      orderIndex: 0,
      type: 'text',
      score: 5,
    },
    {
      id: '2b3c4d5e-6789-01bc-def2-3456789012bc',
      title: 'Describe a successful social media campaign.',
      description:
        'Provide a detailed description of a social media campaign that you consider successful. Explain why it was successful and what strategies were used.',
      version: 1,
      orderIndex: 1,
      type: 'paragraph',
      score: 5,
    },
    {
      id: '3c4d5e6f-7890-12cd-ef34-5678901234cd',
      title:
        'Which of the following are components of a digital marketing strategy?',
      description: 'Select all that apply.',
      version: 1,
      orderIndex: 2,
      type: 'checkbox',
      choices: [
        {
          id: '4d5e6f70-8901-23de-f456-7890123456de',
          choice: 'SEO',
          isCorrect: true,
        },
        {
          id: '5e6f7081-9012-34ef-5678-9012345678ef',
          choice: 'PPC Advertising',
          isCorrect: true,
        },
        {
          id: '6f708192-0123-45f0-6789-0123456789f0',
          choice: 'Traditional TV Advertising',
          isCorrect: false,
        },
        {
          id: '70819203-1234-56a1-7890-1234567890a1',
          choice: 'Content Marketing',
          isCorrect: true,
        },
      ],
      score: 5,
    },
    {
      id: '4d5e6f70-8901-23de-f456-7890123456de',
      title: 'What is the primary goal of content marketing?',
      description: 'Choose the best answer.',
      version: 1,
      orderIndex: 3,
      type: 'multiplechoice',
      choices: [
        {
          id: '5e6f7081-9012-34ef-5678-9012345678ef',
          choice: 'To entertain the audience',
          isCorrect: false,
        },
        {
          id: '6f708192-0123-45f0-6789-0123456789f0',
          choice: 'To sell products directly',
          isCorrect: false,
        },
        {
          id: '70819203-1234-56a1-7890-1234567890a1',
          choice: 'To provide valuable information and build trust',
          isCorrect: true,
        },
        {
          id: '81920314-2345-67b2-8901-2345678901b2',
          choice: 'To increase website traffic quickly',
          isCorrect: false,
        },
      ],
      score: 5,
    },
    {
      id: '5e6f7081-9012-34ef-5678-9012345678ef',
      title: 'Write a simple HTML code for a call-to-action button.',
      description:
        "Create an HTML snippet for a call-to-action button that says 'Subscribe Now'.",
      version: 1,
      orderIndex: 4,
      type: 'code',
      score: 5,
      metadata: {
        codesInfo: {
          codeQuestion: '<button>Subscribe Now</button>',
          language: 'HTML',
        },
      },
    },
    {
      id: '6f708192-0123-45f0-6789-0123456789f0',
      title: 'Rate your understanding of Google Analytics.',
      description:
        'On a scale from 1 to 5, how would you rate your understanding of Google Analytics?',
      version: 1,
      orderIndex: 5,
      type: 'linearscale',
      score: 5,
      metadata: {
        linearScale: {
          toRangeValue: 5,
          fromRangeLabel: 'No understanding',
          toRangeLabel: 'Expert',
        },
      },
    },
    {
      id: '70819203-1234-56a1-7890-1234567890a1',
      title: 'What is the ideal length for a blog post?',
      description: 'Specify the ideal length for a blog post in words.',
      version: 1,
      orderIndex: 6,
      type: 'range',
      score: 5,
      metadata: {
        range: {
          min: '300',
          max: '2000',
        },
      },
    },
    {
      id: '81920314-2345-67b2-8901-2345678901b2',
      title:
        'Select the most effective social media platform for B2B marketing.',
      description:
        'Choose the platform that you think is most effective for B2B marketing.',
      version: 1,
      orderIndex: 7,
      type: 'dropdown',
      score: 5,
      metadata: {
        dropDown: {
          dataset: 'Social Media Platforms',
          datasetData: ['LinkedIn', 'Facebook', 'Twitter', 'Instagram'],
        },
      },
    },
  ],
}
