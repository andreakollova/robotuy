import { ProjectTopic } from '@/types';
import { ch1PreviewContent } from './lessons/ch1-preview-content';
import { ch1PreviewExercises } from './lessons/ch1-preview-exercises';
import { course1IntroContent } from './lessons/course1-intro-content';
import { course1IntroExercises } from './lessons/course1-intro-exercises';
import { ch21Content } from './lessons/ch2-1-content';
import { ch21Exercises } from './lessons/ch2-1-exercises';
import { ch22Content } from './lessons/ch2-2-content';
import { ch22Exercises } from './lessons/ch2-2-exercises';
import { ch231Content } from './lessons/ch2-3-1-content';
import { ch232Content } from './lessons/ch2-3-2-content';
import { ch232Exercises } from './lessons/ch2-3-2-exercises';
import { ch24Content } from './lessons/ch2-4-content';
import { ch24Exercises } from './lessons/ch2-4-exercises';
import { ch231Exercises } from './lessons/ch2-3-1-exercises';

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
        videoUrl: 'https://www.youtube.com/watch?v=csYtU2GY7FY',
        exercises: course1IntroExercises,
      },
      {
        id: 'ch2-1',
        unitId: 'modern-robotics',
        title: 'Chapter 2.1: Degrees of Freedom of a Rigid Body',
        content: ch21Content,
        exercises: ch21Exercises,
      },
      {
        id: 'ch2-2',
        unitId: 'modern-robotics',
        title: 'Chapter 2.2: Degrees of Freedom of a Robot',
        content: ch22Content,
        exercises: ch22Exercises,
      },
      {
        id: 'ch2-3-1',
        unitId: 'modern-robotics',
        title: 'Chapter 2.3.1: Configuration Space Topology',
        content: ch231Content,
        exercises: ch231Exercises,
      },
      {
        id: 'ch2-3-2',
        unitId: 'modern-robotics',
        title: 'Chapter 2.3.2: Configuration Space Representation',
        content: ch232Content,
        exercises: ch232Exercises,
      },
      {
        id: 'ch2-4',
        unitId: 'modern-robotics',
        title: 'Chapter 2.4: Configuration and Velocity Constraints',
        content: ch24Content,
        exercises: ch24Exercises,
      },
    ],
  },
];
