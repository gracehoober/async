"use strict";

const BASE_URL = "https://deckofcardsapi.com/api/deck"

// Event listeners for buttons

async function shuffleDeck() {

  const response = await fetch(`${BASE_URL}/new/shuffle`);
  const json = await response.json();

  console.log(json);

  return json['deck_id'];
}


async function drawCard(deck_id) {

  const response = await fetch(`${BASE_URL}/${deck_id}/draw`);

  console.log("response",response, response);

  const json = await response.json();

  console.log("JSON",json);

  var img = $('<img id="dynamic">');
  img.attr('src', json.cards[0].image);

  console.log(img);

  $("#deck-location").append(img)
}


shuffleDeck();

$('#draw-card').on('click', drawCard);