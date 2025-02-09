const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const ResearchData = require('../models/research');
const isloggedin = require('../middlewares/isloggedin');
const mongoose = require('mongoose');

router.post("/add", isloggedin, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newResearch = new ResearchData({
      title: req.body.title,
      description: req.body.description,
      publishedDate: req.body.date,
      userId: user._id,
    });

    await newResearch.save();
    res.status(201).json({ message: "Research added successfully" });
  } catch (error) {
    console.error("Error adding research:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/data", isloggedin, async (req, res) => {
  try {
    const userId = req.user._id;
    // console.log("LecturereId at backend1", userId);
    const researchData = await ResearchData.find({ userId: userId });
    // console.log("LecturereId at backend2", userId);
    // console.log(researchData);
    res.status(200).json(researchData);
  }
  catch (error) {
    console.log("Unable to fetch the data:", error);
    res.status(500).json({ message: "Unable to fetch the data" });
  }
})

router.get("/otherResearch/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const researches = await ResearchData.find({ userId: id });
    if (researches.length === 0) {
      return res.status(404).json({ message: "No researches found for this user" });
    }
    res.status(200).json(researches);
  } catch (error) {
    console.log("Failed to fetch the resources!!", error);
    res.status(500).json({ message: "Unable to fetch the data" });
  }
})

router.delete("/delete/:id", isloggedin, async (req, res) => {
  try {
    const { id } = req.params;
    await ResearchData.findByIdAndDelete(id);
    res.status(200).json({ message: "Research Deleted" });
  } catch (error) {
    console.log("Error occurred while deleting:", error);
    res.status(500).json({ message: 'Failed to delete research.' });
  }
});

router.put("/update/:id", isloggedin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedResearch = await ResearchData.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.status(200).json(updatedResearch);
  } catch (error) {
    console.error('Error occurred while updating research:', error);
    res.status(500).json({ message: 'Failed to update research.' });
  }
});

router.get("/process", isloggedin, async (req, res) => {
  try {
    const userbranch = req.user.department;

    const unapprovedResearches = await ResearchData.aggregate([
        { 
            $match: { 
                status: false, 
                rejected: false 
            } 
        },
        {
            $lookup: {
                from: 'users', // Replace 'users' with your actual user collection name
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails'
            }
        },
        { 
            $unwind: '$userDetails' 
        },
        {
            $match: {
                'userDetails.department': userbranch
            }
        }
    ]);

    res.status(200).json(unapprovedResearches);

} catch (error) {
    console.log("Error occured while getting data in HOD", error);
    res.status(500).json({ message: 'Failed to get research.' });
  }
})

router.put('/approve/:id', async (req, res) => {
  try {
    const research = await ResearchData.findByIdAndUpdate(
      req.params.id,
      { status: true },
      { new: true }
    );
    if (!research) {
      return res.status(404).send('Research not found');
    }
    res.send(research);
  } catch (error) {
    res.status(500).send('Server error');
  }
});
router.put('/reject/:id', async (req, res) => {
  try {
    const research = await ResearchData.findByIdAndUpdate(
      req.params.id,
      { rejected: true },
      { new: true }
    );
    if (!research) {
      return res.status(404).send('Research not found');
    }
    res.send(research);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.get("/researchtext", isloggedin, async (req, res) => {
  try {
    const userId = req.user._id;
    const email = req.user.email;
    const user = await User.findOne({ email });
    const researchText = await ResearchData.findOne({ userId }).populate("userId");
    
    if (!researchText) {
      return res.status(404).json({ message: "Research not found" });
    }

    // Calculate array sizes
    const SciArticlesSize = researchText.SciArticles.length;
    const WosArticlesSize = researchText.WosArticles.length;
    const ProposalsSize = researchText.Proposals.length;
    const PapersSize = researchText.Papers.length;
    const BooksSize = researchText.Books.length;
    const ChaptersSize = researchText.Chapters.length;
    const PGrantedSize = researchText.PGranted.length;
    const PFiledSize = researchText.PFiled.length;

    // Calculate marks (max 2 for each)
    const PapersMarks = PapersSize*5;
    const BooksMarks = BooksSize*10;
    const ChaptersMarks = ChaptersSize*5;
    const PGrantedMarks = PGrantedSize*10;
    const PFiledMarks = PFiledSize*5;
    const SciMarks=Math.min(SciArticlesSize * 20,30) ;
    const WosMarks=Math.min(WosArticlesSize *10,30) ;
    const ProposalMarks=Math.min(ProposalsSize*10,10);
    const SelfAssessment=Math.min((5*PapersSize)+(10*BooksSize)+(5*ChaptersSize)+(10*PGrantedSize)+(5*PFiledSize),10);


    // Convert Mongoose document to plain object and add calculated values
    const responseData = {
      _id: researchText._id,
      userId: researchText.userId,
      SciArticles: researchText.SciArticles,
      WosArticles: researchText.WosArticles,
      Proposals: researchText.Proposals,
      Papers: researchText.Papers,
      Books: researchText.Books,
      Chapters: researchText.Chapters,
      PGranted: researchText.PGranted,
      PFiled: researchText.PFiled,
      SciArticlesSize,
      WosArticlesSize,
      ProposalsSize,
      PapersSize,
      BooksSize,
      ChaptersSize,
      PGrantedSize,
      PFiledSize,
      SciMarks,
      WosMarks,
      ProposalMarks,
      PapersMarks,
      BooksMarks,
      ChaptersMarks,
      PGrantedMarks,
      PFiledMarks,
      SelfAssessment
    };
    user.ResearchSelfAsses=SelfAssessment; 
    user.WosMarks= WosMarks;
    user.SciMarks=SciMarks;
    user.ProposalMarks=ProposalMarks;
    await user.save();
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching research text:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/addsciarticles",isloggedin, async(req,res)=>{
  try{
    const userId = req.user._id;
    const { articleDetails, ISSN, authorPosition } = req.body;
    let researchEntry = await ResearchData.findOne({ userId });
    if (!researchEntry) {
      researchEntry = new ResearchData({
        userId,
        SciArticles: [{ articleDetails, ISSN, authorPosition }]
      });
    } else {
      researchEntry.SciArticles.push({ articleDetails, ISSN, authorPosition });
    }

    // Save the updated document
    await researchEntry.save();
    res.status(201).json({ message: "Article added successfully!", data: researchEntry });

  }catch(error){
    console.error("Error while adding article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.post("/addwosarticles",isloggedin, async(req,res)=>{
  try{
    const userId = req.user._id;
    const { articleDetails, ISSN, authorPosition } = req.body;
    let researchEntry = await ResearchData.findOne({ userId });
    if (!researchEntry) {
      researchEntry = new ResearchData({
        userId,
        WosArticles: [{ articleDetails, ISSN, authorPosition }]
      });
    } else {
      researchEntry.WosArticles.push({ articleDetails, ISSN, authorPosition });
    }

    // Save the updated document
    await researchEntry.save();
    res.status(201).json({ message: "Article added successfully!", data: researchEntry });

  }catch(error){
    console.error("Error while adding article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.post("/addproposals",isloggedin, async(req,res)=>{
  try{
    const userId = req.user._id;
    const { proposalDetails, fundingAgency, amount } = req.body;
    let researchEntry = await ResearchData.findOne({ userId });
    if (!researchEntry) {
      researchEntry = new ResearchData({
        userId,
        Proposals: [{ proposalDetails, fundingAgency, amount }]
      });
    } else {
      researchEntry.Proposals.push({ proposalDetails, fundingAgency, amount });
    }

    // Save the updated document
    await researchEntry.save();
    res.status(201).json({ message: "Article added successfully!", data: researchEntry });

  }catch(error){
    console.error("Error while adding article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.post("/addpapers",isloggedin, async(req,res)=>{
  try{
    const userId = req.user._id;
    const { paperDetails, authorPosition } = req.body;
    let researchEntry = await ResearchData.findOne({ userId });
    if (!researchEntry) {
      researchEntry = new ResearchData({
        userId,
        Papers: [{ paperDetails, authorPosition }]
      });
    } else {
      researchEntry.Papers.push({ paperDetails, authorPosition });
    }

    // Save the updated document
    await researchEntry.save();
    res.status(201).json({ message: "Article added successfully!", data: researchEntry });

  }catch(error){
    console.error("Error while adding article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.post("/addbooks",isloggedin, async(req,res)=>{
  try{
    const userId = req.user._id;
    const { bookDetails, ISBN } = req.body;
    let researchEntry = await ResearchData.findOne({ userId });
    if (!researchEntry) {
      researchEntry = new ResearchData({
        userId,
        Books: [{ bookDetails, ISBN }]
      });
    } else {
      researchEntry.Books.push({ bookDetails, ISBN });
    }

    // Save the updated document
    await researchEntry.save();
    res.status(201).json({ message: "Article added successfully!", data: researchEntry });

  }catch(error){
    console.error("Error while adding article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.post("/addchapters",isloggedin, async(req,res)=>{
  try{
    const userId = req.user._id;
    const { chapterDetails, Publisher, ISBN, authorPosition } = req.body;
    let researchEntry = await ResearchData.findOne({ userId });
    if (!researchEntry) {
      researchEntry = new ResearchData({
        userId,
        Chapters: [{ chapterDetails, Publisher, ISBN, authorPosition}]
      });
    } else {
      researchEntry.Chapters.push({ chapterDetails, Publisher, ISBN, authorPosition });
    }

    // Save the updated document
    await researchEntry.save();
    res.status(201).json({ message: "Article added successfully!", data: researchEntry });

  }catch(error){
    console.error("Error while adding article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.post("/addpgranted",isloggedin, async(req,res)=>{
  try{
    const userId = req.user._id;
    const { PTitle, PNumber, CountryGranted,GrantedDate } = req.body;
    let researchEntry = await ResearchData.findOne({ userId });
    if (!researchEntry) {
      researchEntry = new ResearchData({
        userId,
        PGranted: [{ PTitle, PNumber, CountryGranted,GrantedDate }]
      });
    } else {
      researchEntry.PGranted.push({ PTitle, PNumber, CountryGranted,GrantedDate});
    }

    // Save the updated document
    await researchEntry.save();
    res.status(201).json({ message: "Article added successfully!", data: researchEntry });

  }catch(error){
    console.error("Error while adding article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.post("/addpfiled",isloggedin, async(req,res)=>{
  try{
    const userId = req.user._id;
    const { PTitle, PNumber, FiledinCountry,PublishedDate } = req.body;
    let researchEntry = await ResearchData.findOne({ userId });
    if (!researchEntry) {
      researchEntry = new ResearchData({
        userId,
        PFiled: [{ PTitle, PNumber, FiledinCountry,PublishedDate }]
      });
    } else {
      researchEntry.PFiled.push({PTitle, PNumber, FiledinCountry,PublishedDate});
    }

    // Save the updated document
    await researchEntry.save();
    res.status(201).json({ message: "Article added successfully!", data: researchEntry });

  }catch(error){
    console.error("Error while adding article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})


router.get("/sciarticles", isloggedin, async (req, res) => {
  try {
    const userId = req.user._id;
    const researchEntry = await ResearchData.findOne({ userId });

    if (!researchEntry || researchEntry.SciArticles.length === 0) {
      return res.status(404).json({ message: "No articles found" });
    }

    res.status(200).json(researchEntry.SciArticles);
  } catch (error) {
    console.error("Error fetching SCI articles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/wosarticles", isloggedin, async (req, res) => {
  try {
    const userId = req.user._id;
    const researchEntry = await ResearchData.findOne({ userId });

    if (!researchEntry || researchEntry.WosArticles.length === 0) {
      return res.status(404).json({ message: "No articles found" });
    }

    res.status(200).json(researchEntry.WosArticles);
  } catch (error) {
    console.error("Error fetching Wos articles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/proposals", isloggedin, async (req, res) => {
  try {
    const userId = req.user._id;
    const researchEntry = await ResearchData.findOne({ userId });

    if (!researchEntry || researchEntry.Proposals.length === 0) {
      return res.status(404).json({ message: "No Proposals found" });
    }

    res.status(200).json(researchEntry.Proposals);
  } catch (error) {
    console.error("Error fetching Proposals:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/papers", isloggedin, async (req, res) => {
  try {
    const userId = req.user._id;
    const researchEntry = await ResearchData.findOne({ userId });

    if (!researchEntry || researchEntry.Papers.length === 0) {
      return res.status(404).json({ message: "No papers found" });
    }

    res.status(200).json(researchEntry.Papers);
  } catch (error) {
    console.error("Error fetching Papers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/books", isloggedin, async (req, res) => {
  try {
    const userId = req.user._id;
    const researchEntry = await ResearchData.findOne({ userId });

    if (!researchEntry || researchEntry.Books.length === 0) {
      return res.status(404).json({ message: "No Books found" });
    }

    res.status(200).json(researchEntry.Books);
  } catch (error) {
    console.error("Error fetching Books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/chapters", isloggedin, async (req, res) => {
  try {
    const userId = req.user._id;
    const researchEntry = await ResearchData.findOne({ userId });

    if (!researchEntry || researchEntry.Books.Chapters === 0) {
      return res.status(404).json({ message: "No Chapters found" });
    }

    res.status(200).json(researchEntry.Chapters);
  } catch (error) {
    console.error("Error fetching Chapters:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/pgranted", isloggedin, async (req, res) => {
  try {
    const userId = req.user._id;
    const researchEntry = await ResearchData.findOne({ userId });

    if (!researchEntry || researchEntry.PGranted.length === 0) {
      return res.status(404).json({ message: "No Patents Granted found" });
    }

    res.status(200).json(researchEntry.PGranted);
  } catch (error) {
    console.error("Error fetching Patents Granted:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/pfiled", isloggedin, async (req, res) => {
  try {
    const userId = req.user._id;
    const researchEntry = await ResearchData.findOne({ userId });

    if (!researchEntry || researchEntry.PFiled.length === 0) {
      return res.status(404).json({ message: "No Patents Filed found" });
    }

    res.status(200).json(researchEntry.PFiled);
  } catch (error) {
    console.error("Error fetching Patents Filed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;