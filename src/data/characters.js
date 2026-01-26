export const CHARACTERS = {
  backend: {
    id: 'backend',
    name: 'Backend Developer',
    color: '#00adb5',
    images: [
      '/assets/images/characters/backend-dev.png',
      '/assets/images/characters/backend-dev-f.png',
    ],
  },
  frontend: {
    id: 'frontend',
    name: 'Frontend Developer',
    color: '#ff6b9d',
    images: ['/assets/images/characters/frontend-dev.png'],
  },
  devops: {
    id: 'devops',
    name: 'DevOps Engineer',
    color: '#f39c12',
    images: ['/assets/images/characters/devops.png'],
  },
  po: {
    id: 'po',
    name: 'Product Owner',
    color: '#e67e22',
    images: ['/assets/images/characters/po.png'],
  },
  junior: {
    id: 'junior',
    name: 'Junior Developer',
    color: '#2ecc71',
    images: ['/assets/images/characters/junior-dev.png'],
  },
};

export const CHARACTER_TYPES = Object.keys(CHARACTERS);
