import { ProjectTopic } from '@/types';
import { ch1PreviewContent } from './lessons/ch1-preview-content';
import { ch1PreviewExercises } from './lessons/ch1-preview-exercises';
import { course1IntroContent } from './lessons/course1-intro-content';
import { course1IntroExercises } from './lessons/course1-intro-exercises';

export const projectTopics: ProjectTopic[] = [
  {
    id: 'modern-robotics',
    title: 'Modern Robotics',
    description: 'Mechanics, Planning, and Control Specialization',
    icon: 'robot',
    lessons: [
      {
        id: 'ch1-preview',
        unitId: 'modern-robotics',
        title: 'Chapter 1: Preview',
        content: ch1PreviewContent,
        exercises: ch1PreviewExercises,
      },
      {
        id: 'ch2-intro',
        unitId: 'modern-robotics',
        title: 'Chapter 2: Configuration Space',
        content: course1IntroContent,
        exercises: course1IntroExercises,
      },
      {
        id: 'ch2-1',
        unitId: 'modern-robotics',
        title: 'Chapter 2.1: Degrees of Freedom of a Rigid Body',
        exercises: [],
      },
      {
        id: 'ch2-2',
        unitId: 'modern-robotics',
        title: 'Chapter 2.2: Degrees of Freedom of a Robot',
        exercises: [],
      },
      {
        id: 'ch2-3-1',
        unitId: 'modern-robotics',
        title: 'Chapter 2.3.1: Configuration Space Topology',
        exercises: [],
      },
      {
        id: 'ch2-3-2',
        unitId: 'modern-robotics',
        title: 'Chapter 2.3.2: Configuration Space Representation',
        exercises: [],
      },
      {
        id: 'ch2-4',
        unitId: 'modern-robotics',
        title: 'Chapter 2.4: Configuration and Velocity Constraints',
        exercises: [],
      },
    ],
  },
];
