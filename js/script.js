let tasks = [
    {
        "category": "todo",
        "label": "User Story",
        "title": "Einführung neuer Funktionen",
        "description": "Implementierung von Benutzeranmeldefunktionen und Profilseiten",
        "date": "2024-04-10",
        "subtasks": [1, "Benutzeranmeldung erstellen", "Profilseiten-Layout gestalten"],
        "priority": "medium",
        "assigned": [["Max Mustermann", "#ff0000"], ["Anna Müller", "#00ff00"], ["Lisa Wagner", "#0000ff"], ]
    },
    {
        "category": "progress",
        "label": "Technical",
        "title": "Datenbankoptimierung",
        "description": "Optimierung der Datenbankabfragen für verbesserte Leistung",
        "date": "2024-04-15",
        "subtasks": [2,"Indizes hinzufügen", "Abfragen überprüfen und optimieren", "Backup-Routinen überprüfen"],
        "priority": "urgent",
        "assigned": [["John Doe", "#ffff00"], ["Sarah Schmidt", "#ff00ff"]]
    },
    {
        "category": "feedback",
        "label": "User Story",
        "title": "Benutzerfreundlichkeit verbessern",
        "description": "Verbesserung der Benutzeroberfläche für eine bessere Benutzererfahrung",
        "date": "2024-04-20",
        "subtasks": [0],
        "priority": "low",
        "assigned": [["Michaela Maier", "#00ffff"]]
    },
    {
        "category": "done",
        "label": "Technical",
        "title": "Sicherheitspatching",
        "description": "Installation von Sicherheitsupdates und Patches zur Behebung von Sicherheitslücken",
        "date": "2024-03-28",
        "subtasks": [2, "Update auf neueste Softwareversion", "Überprüfung der Sicherheitskonfiguration"],
        "priority": "medium",
        "assigned": [["Emily Smith", "#ff8800"], ["David Becker", "#888888"]]
    },
    {
        "category": "todo",
        "label": "User Story",
        "title": "Integration von Zahlungsgateways",
        "description": "Integration von PayPal und Kreditkartenzahlungen in die Plattform",
        "date": "2024-04-05",
        "subtasks": [0, "PayPal-API integrieren", "Kreditkartenverarbeitung implementieren", "Fehlerbehandlung hinzufügen"],
        "priority": "urgent",
        "assigned": [["Daniel Johnson", "#00ff88"], ["Sophie Müller", "#ff0088"]]
    }
];

/** 
 * Adding selectedMenu / selectedImg effects to the selected menu element
 * @param {string} menuitem using the docTitle and giving it to the function to know what page is active
 */
function menuSelected(menuitem) {  
    let menupoint = document.getElementById(menuitem);
    menupoint.classList.add("selectedMenu");
    if (menuitem == "Join-Privacy-Policy" || menuitem == "Join-Legal-Notice") {
      menupoint.style.color = '#cdcdcd';
    } else {
      menupoint.firstChild.classList.add("selectedImg");
    }
  }
  
  /**
   * Loading in the templates of the sidemenu and the header
   * After that calling the menuSelected function to change the appearance of the clicked menu item
   */
  
  async function includeHTML() {
    let includeElements = document.querySelectorAll("[include-html]");
    for (let i = 0; i < includeElements.length; i++) {
      const element = includeElements[i];
      file = element.getAttribute("include-html"); 
      let resp = await fetch(file);
      if (resp.ok) {
        element.innerHTML = await resp.text();
      } else {
        element.innerHTML = "Page not found";
      }
    }
    menuSelected(document.title);
    updateSummaryCounts();
  }