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
import { ch25Content } from './lessons/ch2-5-content';
import { ch25Exercises } from './lessons/ch2-5-exercises';
import { ch231Exercises } from './lessons/ch2-3-1-exercises';
import { ch3IntroContent } from './lessons/ch3-intro-content';
import { ch3IntroExercises } from './lessons/ch3-intro-exercises';
import { ch321p1Content } from './lessons/ch3-2-1-p1-content';
import { ch321p1Exercises } from './lessons/ch3-2-1-p1-exercises';
import { ch321p2Content } from './lessons/ch3-2-1-p2-content';
import { ch321p2Exercises } from './lessons/ch3-2-1-p2-exercises';
import { ch322Content } from './lessons/ch3-2-2-content';
import { ch322Exercises } from './lessons/ch3-2-2-exercises';
import { ch323p2Content } from './lessons/ch3-2-3-p2-content';
import { ch323p2Exercises } from './lessons/ch3-2-3-p2-exercises';
import { ch331Content } from './lessons/ch3-3-1-content';
import { ch331Exercises } from './lessons/ch3-3-1-exercises';
import { ch332p1Content } from './lessons/ch3-3-2-p1-content';
import { ch332p1Exercises } from './lessons/ch3-3-2-p1-exercises';
import { ch323p1Content } from './lessons/ch3-2-3-p1-content';
import { ch323p1Exercises } from './lessons/ch3-2-3-p1-exercises';
import { ch332p2Content } from './lessons/ch3-3-2-p2-content';
import { ch332p2Exercises } from './lessons/ch3-3-2-p2-exercises';
import { ch333Content } from './lessons/ch3-3-3-content';
import { ch333Exercises } from './lessons/ch3-3-3-exercises';
import { ch34Content } from './lessons/ch3-4-content';
import { ch34Exercises } from './lessons/ch3-4-exercises';

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
        videoUrl: 'https://www.youtube.com/watch?v=csYtU2GY7FY',
        bookPage: 1,
        exercises: ch1PreviewExercises,
      },
      {
        id: 'ch2-intro',
        unitId: 'modern-robotics',
        title: 'Chapter 2: Configuration Space',
        content: course1IntroContent,
        videoUrl: 'https://www.youtube.com/watch?v=csYtU2GY7FY',
        bookPage: 17,
        exercises: course1IntroExercises,
      },
      {
        id: 'ch2-1',
        unitId: 'modern-robotics',
        title: 'Chapter 2.1: Degrees of Freedom of a Rigid Body',
        content: ch21Content,
        videoUrl: 'https://www.youtube.com/watch?v=z29hYlagOYM',
        bookPage: 20,
        exercises: ch21Exercises,
      },
      {
        id: 'ch2-2',
        unitId: 'modern-robotics',
        title: 'Chapter 2.2: Degrees of Freedom of a Robot',
        content: ch22Content,
        videoUrl: 'https://www.youtube.com/watch?v=zI64DyaRUvQ',
        bookPage: 23,
        exercises: ch22Exercises,
      },
      {
        id: 'ch2-3-1',
        unitId: 'modern-robotics',
        title: 'Chapter 2.3.1: Configuration Space Topology',
        content: ch231Content,
        videoUrl: 'https://www.youtube.com/watch?v=FyLNR3edOds',
        bookPage: 30,
        exercises: ch231Exercises,
      },
      {
        id: 'ch2-3-2',
        unitId: 'modern-robotics',
        title: 'Chapter 2.3.2: Configuration Space Representation',
        content: ch232Content,
        videoUrl: 'https://www.youtube.com/watch?v=PPgJPjCUIXU',
        bookPage: 33,
        exercises: ch232Exercises,
      },
      {
        id: 'ch2-4',
        unitId: 'modern-robotics',
        title: 'Chapter 2.4: Configuration and Velocity Constraints',
        content: ch24Content,
        videoUrl: 'https://www.youtube.com/watch?v=A14ArEZ47LE',
        bookPage: 36,
        exercises: ch24Exercises,
      },
      {
        id: 'ch2-5',
        unitId: 'modern-robotics',
        title: 'Chapter 2.5: Task Space and Workspace',
        content: ch25Content,
        videoUrl: 'https://www.youtube.com/watch?v=hTuW51CpUg4',
        bookPage: 38,
        exercises: ch25Exercises,
      },
      {
        id: 'ch3-intro',
        unitId: 'modern-robotics',
        title: 'Chapter 3: Introduction to Rigid-Body Motions',
        content: ch3IntroContent,
        videoUrl: 'https://www.youtube.com/watch?v=29LhXWjn7Pc',
        bookPage: 63,
        exercises: ch3IntroExercises,
      },
      {
        id: 'ch3-2-1-p1',
        unitId: 'modern-robotics',
        title: 'Chapter 3.2.1: Rotation Matrices (Part 1 of 2)',
        content: ch321p1Content,
        videoUrl: 'https://www.youtube.com/watch?v=OZucG1DY_sY',
        bookPage: 71,
        exercises: ch321p1Exercises,
      },
      {
        id: 'ch3-2-1-p2',
        unitId: 'modern-robotics',
        title: 'Chapter 3.2.1: Rotation Matrices (Part 2 of 2)',
        content: ch321p2Content,
        videoUrl: 'https://www.youtube.com/watch?v=6KIPusOv5fA',
        bookPage: 75,
        exercises: ch321p2Exercises,
      },
      {
        id: 'ch3-2-2',
        unitId: 'modern-robotics',
        title: 'Chapter 3.2.2: Angular Velocities',
        content: ch322Content,
        videoUrl: 'https://www.youtube.com/watch?v=zJJldJYMxVU',
        bookPage: 83,
        exercises: ch322Exercises,
      },
      {
        id: 'ch3-2-3-p1',
        unitId: 'modern-robotics',
        title: 'Chapter 3.2.3: Exponential Coordinates of Rotation (Part 1 of 2)',
        content: ch323p1Content,
        videoUrl: 'https://www.youtube.com/watch?v=v_KBHaG0mas',
        bookPage: 86,
        exercises: ch323p1Exercises,
      },
      {
        id: 'ch3-2-3-p2',
        unitId: 'modern-robotics',
        title: 'Chapter 3.2.3: Exponential Coordinates of Rotation (Part 2 of 2)',
        content: ch323p2Content,
        videoUrl: 'https://www.youtube.com/watch?v=WHn9xJl43nY',
        bookPage: 93,
        exercises: ch323p2Exercises,
      },
      {
        id: 'ch3-3-1',
        unitId: 'modern-robotics',
        title: 'Chapter 3.3.1: Homogeneous Transformation Matrices',
        content: ch331Content,
        videoUrl: 'https://www.youtube.com/watch?v=vlb3P7arbkU',
        bookPage: 97,
        exercises: ch331Exercises,
      },
      {
        id: 'ch3-3-2-p1',
        unitId: 'modern-robotics',
        title: 'Chapter 3.3.2: Twists (Part 1 of 2)',
        content: ch332p1Content,
        videoUrl: 'https://www.youtube.com/watch?v=mvGZtO_ruj0',
        bookPage: 104,
        exercises: ch332p1Exercises,
      },
      {
        id: 'ch3-3-2-p2',
        unitId: 'modern-robotics',
        title: 'Chapter 3.3.2: Twists (Part 2 of 2)',
        content: ch332p2Content,
        videoUrl: 'https://www.youtube.com/watch?v=VTv0qmLNvjg',
        bookPage: 110,
        exercises: ch332p2Exercises,
      },
      {
        id: 'ch3-3-3',
        unitId: 'modern-robotics',
        title: 'Chapter 3.3.3: Exponential Coordinates of Rigid-Body Motion',
        content: ch333Content,
        videoUrl: 'https://www.youtube.com/watch?v=1jYMvm1U2D0',
        bookPage: 117,
        exercises: ch333Exercises,
      },
      {
        id: 'ch3-4',
        unitId: 'modern-robotics',
        title: 'Chapter 3.4: Wrenches',
        content: ch34Content,
        videoUrl: 'https://www.youtube.com/watch?v=0wsYPJPGtKE',
        bookPage: 125,
        exercises: ch34Exercises,
      },
    ],
  },
];
