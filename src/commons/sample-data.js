export const getStatistic = () => [
  {
    title: "Open",
    status: "open",
    summary: [
      { title: "Open jobs", value: 0 },
      { title: "Jobs with interviews ready for review", value: 0 },
      { title: "Total candidates invited", value: 0 },
      { title: "Completed interviews", value: 0 },
      { title: "Candidates shortlisted", value: 0 }
    ],
    chartData: [2, 5, 4, 1, 3],
    jobs: [
      {
        id: 1,
        title: 'JavaScript Developer',
        candidates: 10,
        interviewed: 5,
        pending: 2,
        shortlisted: 3
      },
      {
        id: 2,
        title: 'QA Engineer',
        candidates: 2,
        interviewed: 0,
        pending: 2,
        shortlisted: 0
      }
    ]
  },
  {
    title: "Closed",
    status: "closed",
    summary: [
      { title: "Closed jobs", value: 0 },
      { title: "Jobs with interviews received", value: 0 },
      { title: "Total candidates invited", value: 0 },
      { title: "Completed interviews", value: 0 },
      { title: "Candidates shortlisted", value: 0 },
    ],
    chartData: [2, 1, 3, 1, 1, 2],
    jobs: [
      {
        id: 1,
        title: 'JavaScript Developer',
        candidates: 10,
        interviewed: 5,
        pending: 2,
        shortlisted: 3
      },
      {
        id: 2,
        title: 'QA Engineer',
        candidates: 2,
        interviewed: 0,
        pending: 2,
        shortlisted: 0
      }
    ]},
    {
      title: "On Hold",
      status: "on_hold",
      summary: [
        { title: "On Hold jobs", value: 0 },
        { title: "Jobs with interviews received", value: 0 },
        { title: "Total candidates invited", value: 0 },
        { title: "Completed interviews", value: 0 },
        { title: "Candidates shortlisted", value: 0 },
      ],
      chartData: [6, 4, 5, 2, 1, 2],
      jobs: [
        {
          id: 22,
          title: 'Lisp Developer',
          candidates: 10,
          interviewed: 5,
          pending: 2,
          shortlisted: 3
        },
        {
          id: 2,
          title: 'NFT Builder',
          candidates: 2,
          interviewed: 0,
          pending: 2,
          shortlisted: 0
        }
      ]
  },
  // {
  //   title: "Shared",
  //   summary: [
  //     { title: "Shared jobs", value: 0 },
  //     { title: "Jobs with interviews received", value: 0 },
  //     { title: "Total candidates invited", value: 0 },
  //     { title: "Completed interviews", value: 0 },
  //     { title: "Candidates shortlisted", value: 0 },
  //   ],
  //   chartData: [6, 4, 5, 2, 1, 2],
  //   jobs: [
  //     {
  //       id: 22,
  //       title: 'Office Assistant',
  //       candidates: 10,
  //       interviewed: 5,
  //       pending: 2,
  //       shortlisted: 3
  //     },
  //     {
  //       id: 2,
  //       title: 'HR Personnel',
  //       candidates: 2,
  //       interviewed: 0,
  //       pending: 2,
  //       shortlisted: 0
  //     }
  //   ]
  // }
]

export const getQuestionCategories = () => [
  { id: 0, name: "General" },
  { id: 1, name: "Technical" }
]

export const getPresetQuestions = () => [
  {
    id: 0,
    question: "What is Java?",
    category: "Technical",
    favorite: true,
    duration: 2
  },
  {
    id: 1,
    question: "How did you hear about this job?",
    category: "General",
    favorite: true,
    duration: 1
  },
  {
    id: 2,
    question: "Where do you see yourself in 5 years?",
    category: "General",
    favorite: false,
    duration: 2
  }
]

export const getInterviews = () => [
  {
    id: 1,
    title: "Java Interview",
    jobId: "2",
    location: "Mountain View, CA",
    coworker: "",
    targetCompletion: new Date(20),
    message: "Thank you for your interest. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis quis tortor eget finibus. Fusce sollicitudin euismod finibus. Vestibulum bibendum tortor eu mi pulvinar, nec consectetur ligula laoreet. Nulla volutpat aliquam ligula, at lobortis ligula faucibus ut. Suspendisse commodo sem sed nulla auctor convallis. Nulla sapien justo, imperdiet venenatis purus aliquam, finibus imperdiet magna. Nunc accumsan ligula odio, vitae sagittis risus scelerisque eget. Cras semper at dolor sit amet aliquam. Suspendisse elementum est eget dui faucibus ullamcorper.",
    candidates: [
      {
        id: 1,
        name: 'Fernando',
        email: 'fernando4@gmail.com',
        phone: '12341',
        status: 'Completed',
        shortlisted: true,
        details: 'Lorem ipsum dolor sit amet.',
        deadlineDate: new Date(),
        rating: 5
      }
    ],
    questions: [{
      id: 1,
      question: 'What is Java?',
      category: 'Technical',
      time: 2
    }, {
      id: 2,
      question: 'Tell me about yourself',
      category: 'General',
      time: 1
    }]
  }
]
export const getCandidateInterviews = () => [
  {
    id: 0,
    candidate: {
      id: 1,
      name: 'Fernando'
    },
    answers: [
      {
        id: 0,
        question: "What is Java",
        rating: 0,
        video: "https://upload.wikimedia.org/wikipedia/commons/a/af/%27I%27m_just_an_ordinary_guy%27_-_2021_Nobelist_David_Card.webm"
      }
    ]
  }
]
