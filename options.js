chrome.storage.sync.get(["Scroll_amount", "Scroll_Speed"], function(data) {
  if (!data.Scroll_amount || !data.Scroll_Speed) {
    chrome.storage.sync.set({ Scroll_Speed: 500, Scroll_amount: 500 });
  }
  $("#Scroll_amount").val(data.Scroll_amount);
  $("#Scroll_Speed").val(data.Scroll_Speed);
});

function saveScrollAmount() {
  var limit = $("#Scroll_amount").val();
  if (limit) {
    chrome.storage.sync.set({ Scroll_amount: limit });
  }
}

function resetScrollAmount() {
  chrome.storage.sync.set({ Scroll_amount: 500 });
}

function saveScrollSpeed() {
  var limit = $("#Scroll_Speed").val();
  if (limit) {
    chrome.storage.sync.set({ Scroll_Speed: limit });
  }
}

function resetScrollSpeed() {
  chrome.storage.sync.set({ Scroll_Speed: 800 });
}

function saveCustomCommands() {
  const commands = [];
  $(".command").each(function() {
    const el = $(this);
    const controls = el.find("input, select");
    const command = controls[0].value;
    const action = controls[1].value;
    const value = controls[2].value;

    commands.push({
      command,
      action,
      value
    });
  });
  chrome.storage.sync.set({ customCommands: commands });
}

function saveAll() {
  saveScrollAmount();
  saveScrollSpeed();
  saveCustomCommands();
}

function resetAll() {
  resetScrollAmount();
  resetScrollSpeed();
}

function addNewCustomCommand(d_command, d_action, d_value, d_index) {
  const tr = document.createElement("tr");
  tr.className = "command";
  const td1 = document.createElement("td");
  const input1 = document.createElement("input");
  if (d_command) {
    input1.value = d_command;
  }
  const td2 = document.createElement("td");
  const select = document.createElement("select");
  const actions = ["open"];
  actions.map(action => {
    const option = document.createElement("option");
    option.value = action;
    option.label = action;
    select.appendChild(option);
    if (d_action == action) {
      option.selected = true;
    }
  });
  const td3 = document.createElement("td");
  const input2 = document.createElement("input");
  if (d_value) {
    input2.value = d_value;
  }
  const td4 = document.createElement("td");
  const delete_btn = document.createElement("button");
  delete_btn.innerText = "Delete";
  delete_btn.className = "delete";
  delete_btn.onclick = () => {
    deleteCustomCommand(d_index);
  };

  td1.appendChild(input1);
  td2.appendChild(select);
  td3.appendChild(input2);
  td4.appendChild(delete_btn);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  const table = document.querySelector("#custom-commands tbody");
  table.appendChild(tr);
}

function deleteCustomCommand(index) {
  chrome.storage.sync.get(["customCommands"], function(data) {
    const commands = data.customCommands;
    commands.splice(index, 1);
    chrome.storage.sync.set({ customCommands: commands });
    loadCustomCommands();
  });
}

function loadCustomCommands() {
  const table = document.querySelector("#custom-commands tbody");
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
  chrome.storage.sync.get(["customCommands"], function(data) {
    const commands = data.customCommands;
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      addNewCustomCommand(command.command, command.action, command.value, i);
    }
    window.__voicer.addCommand(actions);
  });
}

loadCustomCommands();

$("#add-custom-command-btn").on("click", () => addNewCustomCommand());
$("#saveAll").on("click", () => saveAll());
$("#resetAll").on("click", () => resetAll());
