//Create web server
var express = require('express');
var router = express.Router();
var db = require('../models/db.js');
var moment = require('moment');
var dateFormat = require('dateformat');
var now = new Date();

//Get all comments
router.get('/', function(req, res){
	var sql = 'SELECT * FROM comments';
	db.query(sql, function(err, data, fields){
		if(err) throw err;
		res.render('comments/index', {title: 'Comments', comments: data});
	});
});

//Get add comment
router.get('/add', function(req, res){
	res.render('comments/add', {title: 'Add New Comment'});
});

//Post add comment
router.post('/add', function(req, res){
	var comment = {
		name: req.body.name,
		email: req.body.email,
		comment: req.body.comment,
		created_at: dateFormat(now, "yyyy-mm-dd h:MM:ss")
	};
	var sql = 'INSERT INTO comments SET ?';
	db.query(sql, comment, function(err, data, fields){
		if(err) throw err;
		res.redirect('/comments');
	});
});

//Get edit comment
router.get('/edit/:id', function(req, res){
	var id = req.params.id;
	var sql = `SELECT * FROM comments WHERE id = ${id}`;
	db.query(sql, function(err, data, fields){
		if(err) throw err;
		res.render('comments/edit', {title: 'Edit Comment', comment: data[0]});
	});
});

//Post edit comment
router.post('/edit/:id', function(req, res){
	var id = req.params.id;
	var comment = {
		name: req.body.name,
		email: req.body.email,
		comment: req.body.comment,
		created_at: dateFormat(now, "yyyy-mm-dd h:MM:ss")
	};
	var sql = `UPDATE comments SET ? WHERE id = ${id}`;
	db.query(sql, comment, function(err, data, fields){
		if(err) throw err;
		res.redirect('/comments');
	});
});

//Get delete comment
router.get('/delete/:id', function(req, res){
	var id = req.params.id;
	var sql = `DELETE FROM comments WHERE id = ${id}`;
	db.query(sql, function(err, data, fields){
		if(err) throw err;
		res.redirect('/comments');
	});
});

module.exports = router;

