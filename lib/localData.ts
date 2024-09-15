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
        'Explain the concept of Search Engine Optimization and its importance in digital marketing.',
      expectedAnswer:
        'SEO stands for Search Engine Optimization. It is the practice of increasing the quantity and quality of traffic to your website through organic search engine results.',
      version: 1,
      orderIndex: 0,
      type: 'text',
    },
    {
      id: '2b3c4d5e-6789-01bc-def2-2345678901bc',
      title: 'Describe a successful social media campaign.',
      description:
        'Write a detailed description of a social media campaign that you consider successful. Include the goals, strategies, and outcomes.',
      expectedAnswer:
        'A successful social media campaign example is the ALS Ice Bucket Challenge. The goal was to raise awareness and funds for ALS research. The strategy involved participants filming themselves dumping ice water over their heads and challenging others to do the same. The outcome was a viral campaign that raised over $115 million.',
      version: 1,
      orderIndex: 1,
      type: 'paragraph',
    },
    {
      id: '3c4d5e6f-7890-12cd-ef34-3456789012cd',
      title:
        'Which of the following are components of a digital marketing strategy?',
      description: 'Select all that apply.',
      expectedAnswer:
        'SEO, Content Marketing, Social Media Marketing, Email Marketing',
      version: 1,
      orderIndex: 2,
      type: 'checkbox',
      choices: [
        {
          id: '4d5e6f70-8901-23de-f456-4567890123de',
          choice: 'SEO',
          isCorrect: true,
        },
        {
          id: '5e6f7081-9012-34ef-5678-5678901234ef',
          choice: 'Content Marketing',
          isCorrect: true,
        },
        {
          id: '6f708192-0123-45f0-6789-6789012345f0',
          choice: 'Social Media Marketing',
          isCorrect: true,
        },
        {
          id: '708192a3-1234-56f1-7890-7890123456f1',
          choice: 'Email Marketing',
          isCorrect: true,
        },
        {
          id: '8192a3b4-2345-67f2-8901-8901234567f2',
          choice: 'Direct Mail',
          isCorrect: false,
        },
      ],
    },
    {
      id: '4d5e6f70-8901-23de-f456-4567890123de',
      title: 'What is the primary goal of content marketing?',
      description: 'Choose the best answer.',
      expectedAnswer:
        'To attract and retain a clearly defined audience by creating and distributing valuable, relevant, and consistent content.',
      version: 1,
      orderIndex: 3,
      type: 'multipleChoice',
      choices: [
        {
          id: '5e6f7081-9012-34ef-5678-5678901234ef',
          choice:
            'To attract and retain a clearly defined audience by creating and distributing valuable, relevant, and consistent content.',
          isCorrect: true,
        },
        {
          id: '6f708192-0123-45f0-6789-6789012345f0',
          choice: 'To sell products directly through online ads.',
          isCorrect: false,
        },
        {
          id: '708192a3-1234-56f1-7890-7890123456f1',
          choice: 'To increase website traffic through paid advertising.',
          isCorrect: false,
        },
        {
          id: '8192a3b4-2345-67f2-8901-8901234567f2',
          choice: 'To engage with customers through social media posts.',
          isCorrect: false,
        },
      ],
    },
    {
      id: '5e6f7081-9012-34ef-5678-5678901234ef',
      title: 'Write a simple HTML code to create a call-to-action button.',
      description:
        "Provide the HTML code for a button that says 'Click Here' and links to 'https://example.com'.",
      expectedAnswer:
        "<a href='https://example.com'><button>Click Here</button></a>",
      version: 1,
      orderIndex: 4,
      type: 'code',
      metadata: {
        codesInfo: {
          codeQuestion:
            'Write a simple HTML code to create a call-to-action button.',
          language: 'HTML',
        },
      },
    },
    {
      id: '6f708192-0123-45f0-6789-6789012345f0',
      title: 'Rate your understanding of Google Analytics.',
      description:
        'On a scale from 1 to 5, how would you rate your understanding of Google Analytics?',
      expectedAnswer: '3',
      version: 1,
      orderIndex: 5,
      type: 'linearScale',
      metadata: {
        linearScale: {
          toRangeValue: 5,
          fromRangeLabel: 'No understanding',
          toRangeLabel: 'Expert',
        },
      },
    },
    {
      id: '708192a3-1234-56f1-7890-7890123456f1',
      title: 'What is the ideal length for a blog post?',
      description:
        'Provide a range for the ideal length of a blog post in words.',
      expectedAnswer: '1500-2000 words',
      version: 1,
      orderIndex: 6,
      type: 'range',
      metadata: {
        range: {
          min: '1500',
          max: '2000',
        },
      },
    },
    {
      id: '8192a3b4-2345-67f2-8901-8901234567f2',
      title: 'Select the primary platform you use for social media marketing.',
      description: 'Choose one from the list.',
      expectedAnswer: 'Facebook',
      version: 1,
      orderIndex: 7,
      type: 'dropdown',
      metadata: {
        dropDown: {
          dataset: 'Social Media Platforms',
          datasetData: [
            'Facebook',
            'Instagram',
            'Twitter',
            'LinkedIn',
            'TikTok',
          ],
        },
      },
    },
  ],
}
