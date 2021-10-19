/*
* Author         : Hanqing Liu
* Date           : Oct 20, 2021
* Description    : Assignment 2 for COMP229
*/
import express from 'express';
const router = express.Router();
export default router;

//instantiate an object of type index controller
import {DisplayHomePage, DisplayAboutPage, DisplayProjectsPage,
DisplayResumePage, DisplayContactPage, DisplayServicesPage, DisplayListPage } from '../Controllers/index';

/* GET home page. */
router.get('/', DisplayHomePage);

/* GET home page. */
router.get('/home', DisplayHomePage);

/* GET about page. */
router.get('/about', DisplayAboutPage);

/* GET resume page. */
router.get('/resume', DisplayResumePage);

/* GET projects page. */
router.get('/projects', DisplayProjectsPage);

/* GET services page. */
router.get('/services', DisplayServicesPage);

/* GET contact page. */
router.get('/contact', DisplayContactPage);

/* GET contact list page. */
router.get('/contacts-list', DisplayListPage);

//module.exports = router;
