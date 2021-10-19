import express, {Request, Response, NextFunction} from 'express';
import fs from 'fs';

import ContactList from '../Models/contacts';

export function DisplayHomePage(req: Request, res: Response, next: NextFunction)
{
    res.render('index', { title: 'Home', page: 'home' });
}

export function DisplayAboutPage(req: Request, res: Response, next: NextFunction)
{
    res.render('index', { title: 'About', page: 'about' });
}

export function DisplayProjectsPage(req: Request, res: Response, next: NextFunction)
{
    res.render('index', { title: 'Projects', page: 'projects' });
}

export function DisplayServicesPage(req: Request, res: Response, next: NextFunction)
{
    res.render('index', { title: 'Services', page: 'services' });
}

export function DisplayContactPage(req: Request, res: Response, next: NextFunction)
{
    res.render('index', { title: 'Contact Me', page: 'contact' });
}

export function DisplayResumePage(req: Request, res: Response, next: NextFunction)
{
    let filePath = 'Client/Assets/pdf/Resume.pdf';
    fs.readFile(filePath, function (err,data){
    res.contentType("application/pdf");
    res.send(data);
  });
}

export function DisplayListPage(req: Request, res: Response, next: NextFunction)
{
    //db.list.find()
    ContactList.find((err, contactCollection) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        res.render('index', {title: 'Contacts List', page: 'contacts-list', list: contactCollection });

        console.log(contactCollection);
        
    });
}

export function DisplayLoginPage(req: Request, res: Response, next: NextFunction)
{
    res.render('index', { title: 'Login', page: 'login' });
}

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction)
{
    res.render('index', { title: 'Register', page: 'register' });
}

