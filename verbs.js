makeSearchCommand({
  name: "explica",
  homepage: "http://github.com/aitor/verbs",
  author: {name: "Aitor García", email: "aitor@linkingpaths.com"},
  url: "http://buscon.rae.es/draeI/SrvltGUIBusUsual?TIPO_BUS=3&LEMA={QUERY}",
  icon: "http://rae.es/favicon.ico",
  description: "Searches the RAE dictionary for the term.",
  help: "Este comando permite buscar la definición de una palabra en el diccionario oficial de la R.A.E. Por ejemplo, puedes probar &quot;explica dipsomanía&quot;. Por defecto el texto seleccionado se utiliza como termino de busqueda."
  preview: function(pblock, directObject) {
    var searchTerm = directObject.text;
    var pTemplate = "Buscando el significado de <b>${query}</b> en el diccionario de la R.A.E.";
    var pData = {query: searchTerm};
    pblock.innerHTML = CmdUtils.renderTemplate(pTemplate, pData);

    var url = "http://buscon.rae.es/draeI/SrvltGUIBusUsual";
    var params = { TIPO_BUS: "3", origen: "RAE", LEMA: searchTerm };

    jQuery.get(url, params, function(data){ 
       pblock.innerHTML = data;
    });
  }
});