const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const tarefas = [{
    nomeTarefa: "Insira uma tarefa...",
    diaTarefa: "",
    localTarefa: "",
    prioridade:"",
    status:""
}]

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
  
app.get("/", function (req, res) {
    res.render("home", {
        data:tarefas
    })

})

app.post("/", (req,res)=> {
    const inputNomeTarefa = req.body.nomeTarefa
    const inputDiaTarefa = req.body.diaTarefa 
    const inputLocalTarefa = req.body.localTarefa
    const inputPrioridadeTarefa = req.body.prioridadeTarefa

    tarefas.push ({
        nomeTarefa: inputNomeTarefa,
        diaTarefa: inputDiaTarefa,
        localTarefa: inputLocalTarefa,
        prioridadeTarefa: inputPrioridadeTarefa
})

res.render("home", {
    data: tarefas
})
})

app.post('/completar', (req, res) => {
    var tarefaEscolhida = req.body.nomeTarefa;
    tarefas.forEach(tarefa01 => {
        if (tarefa01.nomeTarefa == tarefaEscolhida) {
            tarefa01.status = "Completada";
        }
    })
    res.render("home", {
        data: tarefas
    })
})  

    app.post('/pendente', (req, res) => {
        var tarefaEscolhida = req.body.nomeTarefa;
        tarefas.forEach(tarefa01 => {
            if (tarefa01.nomeTarefa == tarefaEscolhida) {
                tarefa01.status = "Pendente";
            }
        })
        res.render("home", {
            data: tarefas
        })
    })


    app.post('/deletar', (req, res) => {
        var tarefaEscolhida = req.body.nomeTarefa;
        var j = 0;
        tarefas.forEach(tarefa01 => {
            j = j + 1;
            if (tarefa01.nomeTarefa == tarefaEscolhida) {
                tarefas.splice((j - 1), 1)
            }
        })
        res.render("home", {
            data: tarefas
        })
})


app.listen(3000, (req, res) => {
    console.log("App is running on port 3000")
})
