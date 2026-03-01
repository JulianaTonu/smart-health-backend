import express from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { doctorRoutes } from '../modules/doctor/doctor.routes';
import { adminRoutes } from '../modules/admin/admin.routes';
import { ScheduleRoutes } from '../modules/schedule/schedule.routes';


const router = express.Router();

const moduleRoutes = [
  
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/doctor',
        route: doctorRoutes
    },
    {
        path: '/admin',
        route: adminRoutes
    },
    {
        path: '/schedule',
        route: ScheduleRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;