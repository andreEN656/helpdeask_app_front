import './styles/main.css';
import './styles/theme.scss';

if (process.env.NODE_ENV === 'production') {
    console.log('Production ready!');
}

import $ from 'jquery';
import 'bootstrap';
import 'kendo.all';
import 'adminlte.min';

import './app/router';
// router.route('/group-templates', () => {
//   routerGroupTemplates();
// });
//
// router.route('/group-templates', () => {
//   routerGroupTemplates();
// });
//
// router.route('/group-templates', () => {
//   routerGroupTemplates();
// });

// const router = new Navigo()
//
// const HomePage = () => System.import('./home').then(module => module.default())
// const AboutPage = () => System.import('./about').then(module => module.default())
// const CodePage = () => System.import('./code').then(module => module.default())
// const LoginPage = () => System.import('./login').then(module => module.default())
//
// function renderPage(url){
//   System.import('./home').then(module => module.default())
// }
//
// router
//     .on('/', function () {
//       renderPage('./home');
//     })
//     .on('/about', AboutPage)
//     .on('/code', CodePage)
//     .on('/login', LoginPage)
//     .resolve()
//
// $(window).on('load', () => {
//
//     $(document).on('click', '[data-path]', (e) => {
//         e.preventDefault()
//
//         const href = $(e.target).attr('href')
//
//         if (process.env.DEBUG) {
//             console.log(`Navigating to ${href}`)
//         }
//
//         router.navigate(href)
//     })
// })
