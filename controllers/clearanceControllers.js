exports.homepage = function (req, res, next) {
    res.render('index', {
        title: "HOME"
    });
};
