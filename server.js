const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const stagiairesFile = "./db.json";
const formateursFile = "./formateurs.json";

function read(file){
    if(!fs.existsSync(file)){
        fs.writeFileSync(file, "[]");
    }
    return JSON.parse(fs.readFileSync(file, "utf8"));
}

function write(file, data){
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

app.get("/stagiaires", (req,res)=>{
    res.json(read(stagiairesFile));
});

app.post("/stagiaires", (req,res)=>{
    let data = read(stagiairesFile);

    const newItem = {
        id: Number(req.body.id),
        nom: req.body.nom,
        prenom: req.body.prenom,
        age: req.body.age,
        filiere: req.body.filiere,
        groupe: req.body.groupe
    };

    data.push(newItem);
    write(stagiairesFile, data);

    res.json(newItem);
});

app.put("/stagiaires/:id", (req,res)=>{
    let data = read(stagiairesFile);
    const id = Number(req.params.id);

    data = data.map(s =>
        Number(s.id) === id ? { id, ...req.body } : s
    );

    write(stagiairesFile, data);

    res.json({ message: "stagiaire updated" });
});

app.delete("/stagiaires/:id", (req,res)=>{
    let data = read(stagiairesFile);
    const id = Number(req.params.id);

    data = data.filter(s => Number(s.id) !== id);

    write(stagiairesFile, data);

    res.json({ message: "stagiaire deleted" });
});

app.get("/formateurs", (req,res)=>{
    res.json(read(formateursFile));
});

app.post("/formateurs", (req,res)=>{
    let data = read(formateursFile);

    const newItem = {
        id: Number(req.body.id),
        nom: req.body.nom,
        prenom: req.body.prenom,
        age: req.body.age,
        specialite: req.body.specialite,
        email: req.body.email
    };

    data.push(newItem);
    write(formateursFile, data);

    res.json(newItem);
});

app.put("/formateurs/:id", (req,res)=>{
    let data = read(formateursFile);
    const id = Number(req.params.id);

    data = data.map(f =>
        Number(f.id) === id ? { id, ...req.body } : f
    );

    write(formateursFile, data);

    res.json({ message: "formateur updated" });
});

/* DELETE */
app.delete("/formateurs/:id", (req,res)=>{
    let data = read(formateursFile);
    const id = Number(req.params.id);

    data = data.filter(f => Number(f.id) !== id);

    write(formateursFile, data);

    res.json({ message: "formateur deleted" });
});

/* ================= START SERVER ================= */
app.listen(3000, ()=>{
    console.log("🚀 Server running on http://localhost:3000");
});