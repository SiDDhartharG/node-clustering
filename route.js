import express from 'express';
import AsyncListController from './workerCode.js';

const router = express.Router();
const asyncListController = new AsyncListController();

const setRouter = (app) => {
    /**
     * GET status
     */
    router.get('/status', (req, res) => res.send({ status: 200 }));
    router.route('/piscina').get(asyncListController.piscina);

    // gc route
    router.route('/int-gc-clean').get((req, res) => {
        if (global.gc) {
            global.gc();
        } else {
            console.log('Garbage collection unavailable.  Pass --expose-gc when launching node to enable forced garbage collection.');
        }
        res.json({});
    });

    app.use('/clustering', router);
};

export { setRouter };