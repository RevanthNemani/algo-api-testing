/**
 * Project: algo-api-testing
 * Description: api testing for my algo trading setup.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

exports.get404 = (req, res, next) => {
    console.log(req);
    res.status(404).json('not found');
};
