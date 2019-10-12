'use strict';
const router = require('express').Router();
const logger = require('../config/logger');

module.exports = function(neode)
{
    router.get('/skills', (req, res, next) =>
    {
        // logger.info(req.body);
        // const lang = req.body.language;
        // neode.cypher('Create(n:Skill {language: {language}})', {language: lang}).then(res =>
        // {
        //     console.log(res.records.length);
        // });
        // next();
        neode.create('Skill', {
            language         : 'JavaScript',
            yearsOfExperience: 5,
            generalArea      : 'backend',
        }).then(result =>
        {
            logger.info('Successfully created Node in Neo4j');

            return result.toJson();
        }).then(json =>
        {
            res.send(json);
        }).catch(error =>
        {
            logger.error(`Error was caught ${error.message}`);
        });
    });

    return router;
};
