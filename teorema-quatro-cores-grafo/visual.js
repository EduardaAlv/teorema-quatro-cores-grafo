
var svg = d3.select("body").append("svg").attr("width", 792).attr("height", 800);

iniciarGrafo();

function reiniciar() {
  window.location.reload();
}

function iniciar() {
  for (var i = 0; i < arestas.length; i++) {
    (function (i) {
      setTimeout(function () {
        arestas[i].fonte.vizinhos.push(arestas[i].alvo);
        iniciarGrafo();
      }, 50 * i);
    })(i);
  }
}

var path;
var circle;

var selected_node = null,
  selected_link = null;

function iniciarGrafo() {
  svg.selectAll("g").remove();


  //Gera os circulos
  (path = svg.append("svg:g").selectAll("path")), (circle = svg.append("svg:g").selectAll("g"));

  circle = circle.data(vertices, function (d) {
    return d.id;
  });
  circle.selectAll("circle").style("fill", function (d) {
    return d.cor;
  });

  
  // Função que retorna as cores; 
  coresGrafo();


  //Colore os circulos
  var g = circle.enter().append("svg:g");
  g.append("svg:circle").attr("class", "vertice").attr("id", function(d){
      return "c" + d.id;
    }).attr("r", 12).attr("cx", function (d) {
      return d.x;
    }).attr("cy", function (d) {
      return d.y;
    }).style("fill", function (d) {
      return d.cor;
    });


  // Insere o texto nos circulos.
  g.append("svg:text").attr("x", function (d) {
      return d.x;
    }).attr("y", function (d) {
      return d.y;
    }).attr("class", "contadorVizinhos").text(function (d) {
      return d.estado;
    });

  // Colore o mapa.
  path = path.data(arestas);
  path.classed("selected", function (d) {
    return d === selected_link;
  });

  path.enter().append("svg:path").attr("class", "aresta").classed("selected", function (d) {
      return d === selected_link;
    }).attr("d", function (d) {
      var deltaX = d.alvo.x - d.fonte.x,
        deltaY = d.alvo.y - d.fonte.y,
        dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
        normX = deltaX / dist,
        normY = deltaY / dist,
        fontePadding = 12;
      alvoPadding = 12;
      (fonteX = d.fonte.x + fontePadding * normX), (fonteY = d.fonte.y + fontePadding * normY), (targetX = d.alvo.x - alvoPadding * normX), (targetY = d.alvo.y - alvoPadding * normY);
      return "M" + fonteX + "," + fonteY + "L" + targetX + "," + targetY;
    });
}


function coresGrafo() {

  vertices.sort(function (a, b) {
    return b.contadorVizinhos - a.contadorVizinhos;
  });
  vertices.forEach(function (d) {
    d.cor = "";
  });
  var counter = 0;
  for (let c of cores) {
    for (let n of vertices) {
      if (n.cor == "") {
        vizinhoTemCor = false;
        for (let adj of n.vizinhos) {
          if (c == adj.cor) {
            vizinhoTemCor = true;
            break;
          }
          counter++;
        }
        if (!vizinhoTemCor) n.cor = c;
      }
    }
  }
  
  }


d3.select(window);
