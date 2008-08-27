makeSearchCommand({
  name: "rae",
  homepage: "http://github.com/aitor/verbs",
  author: {name: "Aitor García", email: "aitor@linkingpaths.com"},
  description: "Searches RAE Spanish dictionary for your words.",
  icon: "http://rae.es/favicon.ico",
  url: "http://buscon.rae.es/draeI/SrvltGUIBusUsual?LEMA={QUERY}&origen=RAE&TIPO_BUS=1",
  preview: function(pblock, directObject) {
    var searchTerm = directObject.text;
    var pTemplate = "Searches Rae for <b>${query}</b>";
    var pData = {query: searchTerm};
    pblock.innerHTML = CmdUtils.renderTemplate(pTemplate, pData);

    var url = "http://buscon.rae.es/draeI/SrvltGUIBusUsual";
    var params = { LEMA: searchTerm, ORIGEN: "RAE", TIPO_BUS: "1" };

    jQuery.get( url, params, function(data) {
      var numToDisplay = 3;
      var results = jQuery(data).find("item").slice( 0, numToDisplay );

      pblock.innerHTML = "";

      var templ = '<a href="${link}"><b><u>${title}</u></b><br/>${description}</a><br/><br/>';

      results.each(function(){
        var e = jQuery(this);
        var tdata = {
          title: e.find("title").text(),
          link: e.find("link").text(),
          description: e.find("description").text(),
        }
        pblock.innerHTML += CmdUtils.renderTemplate(templ, tdata);
      });
    }, "xml");
  },
});

makeSearchCommand({
  name: "RAE",
  url: "http://buscon.rae.es/draeI/SrvltConsulta?TIPO_BUS=3&LEMA={QUERY}",
  description: "Searches the RAE dictionary for the term.",
  preview: function(pblock, directObject) {
    var searchTerm = directObject.text;
    var pTemplate = "Searches the RAE dictionary for <b>${query}</b>";
    var pData = {query: searchTerm};
    pblock.innerHTML = CmdUtils.renderTemplate(pTemplate, pData);

    var url = "http://buscon.rae.es/draeI/SrvltConsulta";
    var params = { TIPO_BUS: "3", LEMA: searchTerm };

  }
});