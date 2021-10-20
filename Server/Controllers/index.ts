import express, {Request, Response, NextFunction} from 'express';
import fs from 'fs';

import passport from 'passport';

//create an instance of the User Model
import User from '../Models/user';

//get a reference to the Contact Model Class
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

/*functions for authentication */
export function DisplayLoginPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Login', page: 'login' });
}

export function ProcessLoginPage(req: Request, res: Response, next: NextFunction): void
{
    passport.authenticate('local', (err, user, info) =>
    {
        //are there any serer errors?
        if(err)
        {
            console.error(err);
            return next(err);
        }

        //are there any login errors?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }

        req.login(user, (err) => 
        {
            // are there any db errors?
            if(err)
            {
                console.error(err);
                return next(err);
            }

            return res.redirect('/contacts-list');
        });
    })(req, res, next);
}

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
        res.render('index', { title: 'Register', page: 'register' });
    }

    return res.redirect('/contacts-list');
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    //instantiate new UserObject
    let newUser = new User
    ({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.firstName + " " + req.body.lastName
    });

    User.register(newUser, req.body.password, (err) =>
    {
        if(err)
        {
            console.error('Error: Inserting New User');
            if(err.name == "UserExistsError")
            {               
                console.error('Error: User Already Exists');
            }
            req.flash('registerMessage', 'Registration Error');

            return res.redirect('/register');
        }

        //after successful registration - let's login the user
        return passport.authenticate('local')(req, res, () =>
        {
            return res.redirect('/contacts-list')
        });
    });
}

export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void
{
    req.logout();

    res.redirect('/login');
}
