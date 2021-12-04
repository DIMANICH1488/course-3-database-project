import { UserService, } from './UserService';
import { DriverService, } from './DriverService';
import { OrderService, } from './OrderService';
import { DriveService, } from './DriveService';
import { FeedbackService, } from './FeedbackService';

export const userService = new UserService();
export const driverService = new DriverService();
export const orderService = new OrderService();
export const driveService = new DriveService();
export const feedbackService = new FeedbackService();