"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayLoginPage = exports.DisplayListPage = exports.DisplayResumePage = exports.DisplayContactPage = exports.DisplayServicesPage = exports.DisplayProjectsPage = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;
const fs_1 = __importDefault(require("fs"));
const contacts_1 = __importDefault(require("../Models/contacts"));
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home' });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplayAboutPage(req, res, next) {
    res.render('index', { title: 'About', page: 'about' });
}
exports.DisplayAboutPage = DisplayAboutPage;
function DisplayProjectsPage(req, res, next) {
    res.render('index', { title: 'Projects', page: 'projects' });
}
exports.DisplayProjectsPage = DisplayProjectsPage;
function DisplayServicesPage(req, res, next) {
    res.render('index', { title: 'Services', page: 'services' });
}
exports.DisplayServicesPage = DisplayServicesPage;
function DisplayContactPage(req, res, next) {
    res.render('index', { title: 'Contact Me', page: 'contact' });
}
exports.DisplayContactPage = DisplayContactPage;
function DisplayResumePage(req, res, next) {
    let filePath = 'Client/Assets/pdf/Resume.pdf';
    fs_1.default.readFile(filePath, function (err, data) {
        res.contentType("application/pdf");
        res.send(data);
    });
}
exports.DisplayResumePage = DisplayResumePage;
function DisplayListPage(req, res, next) {
    contacts_1.default.find((err, contactCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Contacts List', page: 'contacts-list', list: contactCollection });
        console.log(contactCollection);
    });
}
exports.DisplayListPage = DisplayListPage;
function DisplayLoginPage(req, res, next) {
    res.render('index', { title: 'Login', page: 'login' });
}
exports.DisplayLoginPage = DisplayLoginPage;
//# sourceMappingURL=index.js.map