export default    {
  items: [
    {
      title: true,
      name: 'Visualisation',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Dashboards',
      url: '/dashboards',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
      children: [
        {
          name: 'Graph',
          url: '/dashboards/graph/generate',
          icon: 'icon-puzzle',
        },
        {
          name: 'Finding',
          url: '/dashboards/finding',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Metrics',
      url: '/metrics',
      icon: 'icon-calculator',
      children: [
        {
          name: 'Agents',
          url: '/metrics/agents',
          icon: 'icon-calculator',
        },
        {
          name: 'Findings',
          url: '/metrics/findings',
          icon: 'icon-calculator',
        },
      ],
    },
    {
      title: true,
      name: 'Settings',
      class: 'mt-auto',
    },
    {
      name: 'Profile',
      url: '/profile',
      icon: 'icon-user',
    },
  ],
};
