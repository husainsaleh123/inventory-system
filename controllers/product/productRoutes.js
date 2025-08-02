const express = require("express")
const router = express.Router()
const productViews = require("./productViews")
const productData = require("./productData")
const productApi = require("./productAPI")

//Index
router.get("/",productData.index,productViews.index)
//New
router.get("/new",productViews.newView)
//Destroy
router.delete("/:id",productData.destroy,productViews.redirectHome)
//Update
router.put("/:id",productData.update,productViews.redirectShow)
//Create
router.post("/",productData.create,productViews.redirectHome)
//Edit
router.get("/:id/edit",productData.show,productViews.edit)
//Show
router.get("/:id",productData.show, productViews.show)

module.exports=router