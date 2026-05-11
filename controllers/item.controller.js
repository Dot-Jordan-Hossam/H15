const express = require("express");
const jwt = require("jsonwebtoken");

const Item = require("../model/Items");
const User = require("../model/User");



// ================= CREATE ITEM =================
// Admin Only

const createItem = async (req, res) => {
  try {
    // create item
    const item = await Item.create(req.body);

    res.status(201).json(item);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= GET ALL ITEMS =================
// Public

const getAllItems = async (req, res) => {
  try {

    const items = await Item.find();

    res.json(items);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= GET SINGLE ITEM =================
// Public

const getSingleItem = async (req, res) => {
  try {

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item Not Found",
      });
    }

    res.json(item);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= UPDATE ITEM =================
// Admin Only

const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!item) {
      return res.status(404).json({
        message: "Item Not Found",
      });
    }

    res.json(item);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= DELETE ITEM =================
// Admin Only

const deleteItem = async (req, res) => {
  try {

    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item Not Found",
      });
    }

    res.json({
      message: "Item Deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getSingleItem,
  updateItem,
  deleteItem
};