interface Activity {
  id: string;
  name: string;
  status: string;
  avatar: string;
}

// In-memory storage for demo purposes
const activities: Activity[] = [
  {
    id: '1',
    name: 'Claire Task',
    status: '24%',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '2',
    name: 'Not Yet Done',
    status: '56%',
    avatar: 'https://i.pravatar.cc/150?img=4'
  }
];

export const activitiesService = {
  async getAll(): Promise<Activity[]> {
    return activities;
  },

  async create(data: Omit<Activity, 'id'>): Promise<Activity> {
    const activity = {
      id: Math.random().toString(36).substring(7),
      ...data
    };
    activities.push(activity);
    return activity;
  }
};