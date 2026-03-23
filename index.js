const debug = true;
const fill_opacity=0.6;
$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const lib = (params.get('lib') || '').toUpperCase();
  let loc = (params.get('loc') || '').toUpperCase();
  const rawCcn = params.get('ccn') || params.get('CCN') || '';
  const decodedCcn = decodeURIComponent(rawCcn.replace(/\+/g, ' ')).trim();
  const cleanCcn = normalizeCallNumber(decodedCcn);
  console.log("cleanCcn", cleanCcn);
  let matchFound = false;

$('#lib').text(lib);

(function () {
    const reg = (lib === 'MORTENSEN')
        ? SVG_Registration_MORTENSEN
        : (lib === 'ALLEN')
            ? SVG_Registration_ALLEN
            : null;

    if (!reg) return;

    const entry = reg[loc];
    if (!entry || !entry.description) return;

    let friendly = entry.description.split("_").map(word =>word.charAt(0)+ word.slice(1)).join(" ");

    $('#loc').text(friendly);
})();

$('#ccn').text(decodedCcn);

// ==========================================
// ==========================================
// UNIVERSAL ONLINE HANDLER (LIBRARY-FIRST)
// ==========================================

// ==========================================
// ALLEN LIBRARY  (LIB IS KING)
// ==========================================
//ALLEN LIBRARY BELOW AND BEGINS HERE
if (lib === "ALLEN") {

    // --------------------------
    // ONLINE
    // --------------------------
    if (loc === "ONLINE") {

        $('#row1').show();
        $('#msvg1').show();

        highlightSvg('#cell-ALLEN_CIRCULATION_DESK');
        $('#loc').text("Lower Level (1st Floor) Ask at Circulation Desk");

        return;
    }

    // --------------------------
    // UNASSIGNED
    // --------------------------
    if (loc === "UNASSIGNED") {

        $('#row1').show();
        $('#msvg1').show();

        highlightSvg('#cell-ALLEN_CIRCULATION_DESK');
        $('#loc').text("Lower Level (1st Floor) Ask at Circulation Desk");

        return;
    }

    // ---------------------------------------
    // MORE ALLEN LOCATIONS GO HERE (SHELVES, DANCE, M-RANGES, ETC.)
    // ---------------------------------------

} // END ALLEN LIBRARY BLOCK

//ALLEN LIBRARY ABOVE AND ENDS HERE
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//MORTENSEN LIBRARY BELOW AND BEGINS HERE
// ==========================================
// MORTENSEN LIBRARY  (LIB IS KING)
// ==========================================
if (lib === "MORTENSEN") {

    // --------------------------
    // ONLINE
    // --------------------------
    if (loc === "ONLINE") {

        $('#row2').show();
        $('#msvg2').show();

        highlightSvg('#cell-MORTENSEN_F2_CIRCULATION');
        $('#loc').text("Main Level (2nd Floor) Ask at Circulation Desk");

        return;
    }

    // --------------------------
    // UNASSIGNED
    // --------------------------
    if (loc === "UNASSIGNED") {

        $('#row2').show();
        $('#msvg2').show();

        highlightSvg('#cell-MORTENSEN_F2_CIRCULATION');
        $('#loc').text("Main Level (2nd Floor) Ask at Circulation Desk");

        return;
    }


// ---- MICROFORM OVERRIDE ----
//const callnum = (params.get("ccn") || "").toLowerCase();
//const location = (params.get("loc") || "").toLowerCase();

if (loc.includes("MICRO")) {
    $('#row2').show();
    $('#msvg2').show();
    //$('#loc').text("Mortensen Library Microform");
    highlightSvg('#cell-MORTENSEN_F2_MICROALL_RECT1');
    highlightSvg('#cell-MORTENSEN_F2_MICROALL_RECT2');    
    $('#loc').text("Main Level (2nd Floor) " + cleanCcn);
    matchFound = true;
    return;
}// ---- MICROFORM OVERRIDE ----


    // ---------------------------------------
    // MORE MORTENSEN LOCATIONS GO HERE (SHELVES, MEDIA, REF, ETC.)
    // ---------------------------------------

} // END MORTENSEN LIBRARY BLOCK







//CLOSEDSTAC: {usecallnums: false,description: "Lower_Level_(1st_Floor)_Closed_Stacks",
//CLOSEDSTAC: {usecallnums: false,description: "Lower_Level_(1st_Floor)_Closed_Stacks", rowid: "#row1", basemapid: "#msvg1", baselibraryFloor: "First", svgid:'#cell-ALLEN_CIRCULATION_DESK'},

if (lib === 'ALLEN' && loc === 'CLOSEDSTAC'){
    $('#row1').show();
    $('#msvg1').show();
    highlightSvg('#cell-ALLEN_CIRCULATION_DESK');
    $('#loc').text("Lower Level (1st Floor) Ask at Circulation Desk");
    matchFound = true;
    return;
}//if (lib === 'ALLEN' && loc === 'CLOSEDSTAC'){

// =====================
// ALLEN — A1 Range Early Exit (Before SHELVES logic)
// =====================
// =====================
// NEW CODE AS OF 3/10/26
// =====================
// ALLEN — A1 Range Early Exit (Before SHELVES logic)
// =====================
if (lib === 'ALLEN' && loc === 'SHELVES') {
    // A1 range: A1 → GU9999.Z9999
    if (callNumberInRange(cleanCcn, "A1", "GU9999.Z9999")) {
        highlightSvg('#cell-ALLEN_F1_A_TO_Z_AND_DANCE');
        $('#row1').show();
        $('#msvg1').show();        
        $('#loc').text("Lower Level (1st Floor) A–Z Shelves");
        matchFound = true;
        return;
    } // if (callNumberInRange(cleanCcn, "A1", "GU9999.Z9999"))
} // if (lib === 'ALLEN' && loc === 'SHELVES')

// =====================
// ALLEN — GZ1 Range Early Exit (Before SHELVES logic)
// =====================
if (lib === 'ALLEN' && loc === 'SHELVES') {

    // GZ1 range: GZ1 → LZ9999.Z9999
    if (callNumberInRange(cleanCcn, "GZ1", "LZ9999.Z9999")) {
        highlightSvg('#cell-ALLEN_F1_A_TO_Z_AND_DANCE');
        $('#row1').show();
        $('#msvg1').show();          
        $('#loc').text("Lower Level (1st Floor) A–Z Shelves");
        matchFound = true;
        return;
    } // if (callNumberInRange(cleanCcn, "GZ1", "LZ9999.Z9999"))
} // if (lib === 'ALLEN' && loc === 'SHELVES')

// =====================
// ALLEN — N1 Range Early Exit (Before SHELVES logic)
// =====================
if (lib === 'ALLEN' && loc === 'SHELVES') {

    // N1 range: N1 → ZZ9999.Z9999
    if (callNumberInRange(cleanCcn, "N1", "ZZ9999.Z9999")) {
        highlightSvg('#cell-ALLEN_F1_A_TO_Z_AND_DANCE');
        $('#row1').show();
        $('#msvg1').show();          
        $('#loc').text("Lower Level (1st Floor) A–Z Shelves");
        matchFound = true;
        return;
    } // if (callNumberInRange(cleanCcn, "N1", "ZZ9999.Z9999"))
} // if (lib === 'ALLEN' && loc === 'SHELVES')

// =====================
// ALLEN — GV1 Range Early Exit (Before SHELVES logic)
// =====================
if (lib === 'ALLEN' && loc === 'SHELVES') {

    // GV1 range: GV1 → GV9999.Z9999
    if (callNumberInRange(cleanCcn, "GV1", "GV9999.Z9999")) {
        highlightSvg('#cell-ALLEN_F1_A_TO_Z_AND_DANCE');
        $('#row1').show();
        $('#msvg1').show();          
        $('#loc').text("Lower Level (1st Floor) Dance");
        matchFound = true;
        return;
    } // if (callNumberInRange(cleanCcn, "GV1", "GV9999.Z9999"))
} // if (lib === 'ALLEN' && loc === 'SHELVES')

// END OF NEW CODE AS OF 3/10/26

// =====================
// ALLEN — High Priority Override (General M)
// =====================

// =====================
// ALLEN — SHELVES (Split M ranges using callNumberInRange)
// =====================
if (lib === 'ALLEN' && loc === 'DANCE'){
    $('#row1').show();
    $('#msvg1').show();
    highlightSvg('#cell-ALLENA2ZDANCE');
    matchFound = true;
    return;
}//if (lib === 'ALLEN' && loc === 'DANCE'){



if (lib === 'ALLEN' && loc === 'SHELVES' &&
    cleanCcn.startsWith('M') &&
    !cleanCcn.startsWith('ML') &&
    !cleanCcn.startsWith('MT')) {

    $('#row1').show();
    $('#msvg1').show();

    // Region 1: M1 → M19.9999.Z9999
    if (callNumberInRange(cleanCcn, "M1", "M19.9999.Z9999")) {
        highlightSvg('#cell-ALLENSCORES_M1_TO_M9999PART1');
        matchFound = true;
        return;
    }

    // Region 2: M20 → M9999.Z9999
    if (callNumberInRange(cleanCcn, "M20", "M9999.Z9999")) {
        highlightSvg('#cell-ALLENSCORES_M1_TO_M9999PART2');
        matchFound = true;
        return;
    }

    // If somehow neither matched, fall back to circulation desk
    highlightSvg('#cell-ALLEN_CIRCULATION_DESK');
    matchFound = true;
    return;
}

if (lib === 'ALLEN' && loc === 'SHELVES' && cleanCcn.startsWith('ML')) {
    $('#row1').show();
    $('#msvg1').show();
    highlightSvg('#cell-ALLENSHELVESML');
    matchFound = true;
    return;
}

if (lib === 'MORTENSEN' && loc === 'BOUNDPER' && cleanCcn.startsWith('MICROFILM')) {
  $('#row2').show();
  $('#msvg2').show();
  highlightSvg('#cell-MORTENSEN_F2_MICROALL_RECT1');
  highlightSvg('#cell-MORTENSEN_F2_MICROALL_RECT2');
  matchFound = true;
  return;
}

if (lib === 'MORTENSEN' && loc === 'OVERSIZED' && cleanCcn.startsWith('N')) {
  $('#row3').show();
  $('#msvg3').show();
  highlightSvg('#cell-MORTENSEN_F3_OVERSIZED_N');
  matchFound = true;
  return;
}

if (lib === 'MORTENSEN' && loc === 'OVERSIZED' && /^[A-Z]/.test(cleanCcn) && !cleanCcn.startsWith('N')) {
  $('#row3').show();
  $('#msvg3').show();
  highlightSvg('#cell-MORTENSEN_F3_OVERSIZED_A_TO_L_AND_P_TO_Z');
  matchFound = true;
  return;
}

if (debug) {
    console.log("Raw call number from URL:", rawCcn);
    console.log("Decoded call number:", decodedCcn);
    console.log("Normalized call number:", cleanCcn);
}


function handleEntry(entry, libName, locName) {

    // -----------------------------------------
    // UNASSIGNED special case
    // -----------------------------------------
    if (loc == 'UNASSIGNED')
        $('#loc').text("Lower Level (1st Floor) Ask at Circulation Desk");

    // -----------------------------------------
    // Locations that do NOT use call numbers
    // -----------------------------------------
    if (entry.usecallnums === false) {
        if (debug) console.log(`Skipping call number matching for location ${locName} (usecallnums = false)`);
        if (entry.rowid) $(entry.rowid).show();
        if (entry.basemapid) $(entry.basemapid).show();
        highlightSvg(entry.svgid);
        return true;
    }

    // -----------------------------------------
    // Locations that DO use call numbers
    // -----------------------------------------
    const ranges = entry.biblio_call_numbers || [];
    if (debug) console.log(`Checking ${ranges.length} ranges for location ${locName} in ${libName}`);

    for (const range of ranges) {
        const { cnb, cne, rowid, basemapid, svgid } = range;
        const inRange = callNumberInRange(cleanCcn, cnb, cne);

        if (debug) console.log(`Checking range: ${cnb} to ${cne} → Match: ${inRange}`);

        if (inRange) {

            // Debug output for SHELVES
            if (debug && locName === "SHELVES") {
                console.log("THIS IS A SHELVES RESOURCE");
                console.log("Current target (full SVG registration object):", {
                    cnb,
                    cne,
                    description: range.description,
                    rowid,
                    basemapid,
                    baselibraryFloor: range.baselibraryFloor,
                    svgid
                });
            }

            // Dynamic label for SHELVES
            if (locName === "SHELVES") {
                if (range.baselibraryFloor === "Second") {
                    $('#loc').text("Main Level (2nd Floor) Shelves");
                } else if (range.baselibraryFloor === "Third") {
                    $('#loc').text("Upper Level (3rd Floor) Shelves");
                }
            }

            if (rowid) $(rowid).show();
            if (basemapid) $(basemapid).show();
            highlightSvg(svgid);

            if (debug) console.log("Matched range:", cnb, "to", cne);
            return true;
        }
    }  // ← END of the for-loop ONLY


    // -----------------------------------------
    // NO MATCH FOUND — FALLBACK
    // -----------------------------------------
    if (debug) console.warn("No matching range found for call number:", cleanCcn);

    $('#svg-wrapper').append(`
      <p style="color:red; font-size: 1.2em; text-align: center; margin-top: 1em;">
        We couldn’t locate this item. Please ask for help at the ${libName} Library Circulation Desk.
      </p>
    `);

    if (entry.rowid) $(entry.rowid).show();
    if (entry.basemapid) $(entry.basemapid).show();

    highlightSvg(entry.svgid);

    highlightCirculationDesk(
        libName === 'ALLEN'
            ? '#cell-ALLEN_CIRCULATION_DESK'
            : '#cell-MORTENSEN_F2_CIRCULATION'
    );

    return false;

} // ← THIS is the real end of handleEntry()



if (lib === 'ALLEN') {
    if (loc === 'SHELVES') {
      const prefix = cleanCcn.slice(0, 2);
      if (prefix === 'ML') loc = 'SHELVESML';
      else if (prefix === 'MT') loc = 'SHELVESMT';
    }

    const reg = SVG_Registration_ALLEN;
    const entry = reg[loc];
    //console.log("entry9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999", entry)


//if(loc=='SHELVESMT')$('#loc').text("Lower Level 1st Floor Shelves Begins With MT");
//if(loc=='SHELVESML')$('#loc').text("Lower Level 1st Floor Shelves Begins With ML");



    if (!entry) {
      if (debug) console.warn("Unknown location:", loc);
      $('#row1').show();
      $('#msvg1').show();
      highlightSvg('#cell-ALLEN_CIRCULATION_DESK');
      return;
    }

    matchFound = handleEntry(entry, 'Allen', loc);

} else if (lib === 'MORTENSEN') {
    const reg = SVG_Registration_MORTENSEN;
    const entry = reg[loc];

    if (!entry) {
      if (debug) console.warn("Unknown location:", loc);
      $('#row2').show();
      $('#msvg2').show();
      highlightSvg('#cell-MORTENSEN_F2_CIRCULATION');
      return;
    }

    matchFound = handleEntry(entry, 'Mortensen', loc);

} else {
    if (debug) console.warn("Unknown library:", lib);
    $('#row2').show();
    $('#msvg2').show();
    highlightSvg('#cell-MORTENSEN_F2_CIRCULATION');
    return;
}//end if

if (!matchFound) {
    $('#row2').show();
    $('#msvg2').show();
    highlightSvg('#cell-MORTENSEN_F2_CIRCULATION');
}

function normalizeCallNumber(cn) {
    return cn.toUpperCase().replace(/\s+/g, ' ').trim();
}

function tokenizeCallNumber(cn) {
    return cn.match(/[A-Z]+|\d+\.\d+|\d+|[A-Z]+\d*|\S+/g) || [];
}

function compareParts(aParts, bParts) {
    const len = Math.max(aParts.length, bParts.length);
    for (let i = 0; i < len; i++) {
      const a = aParts[i] || '';
      const b = bParts[i] || '';
      const cmp = a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
      if (cmp !== 0) return cmp;
    }
    return 0;
}

function callNumberInRange(cn, start, end) {
    const cnParts = tokenizeCallNumber(cn);
    const startParts = tokenizeCallNumber(start);
    const endParts = tokenizeCallNumber(end);

    if (debug) {
      console.log(`Tokenized CN: ${JSON.stringify(cnParts)}`);
      console.log(`Start: ${start} → ${JSON.stringify(startParts)}`);
      console.log(`End: ${end} → ${JSON.stringify(endParts)}`);
    }

    return compareParts(cnParts, startParts) >= 0 && compareParts(cnParts, endParts) <= 0;
}

function highlightSvg(ids) {
    if (!ids) return;
    const idList = Array.isArray(ids) ? ids : [ids];

    function tryHighlight(attemptsLeft = 10) {
      let allFound = true;

      idList.forEach(id => {
        const $group = $(id);
        const $target = $group.find('rect, path, polygon, ellipse, circle').first();

        if ($target.length) {
          $target.attr('style', function (i, s) {
            return (s || '') + ' fill: #ffeb3b !important; fill-opacity: ' + fill_opacity + ' !important; stroke: none !important; stroke-width: 0 !important;';
          });
        } else {
          if (debug) console.warn("No target found to highlight inside:", id);
          allFound = false;
        }
      });

      if (!allFound && attemptsLeft > 0) {
        setTimeout(() => tryHighlight(attemptsLeft - 1), 300);
      }
    }

    tryHighlight();
}

function highlightCirculationDesk(circDeskId) {
    console.log("highlightCirculationDesk called:", circDeskId);

    const $circ = $(circDeskId);
    if ($circ.length) {
      $circ.find('rect, path, polygon, ellipse, circle').first().attr('style', function (i, s) {
        return (s || '') + ' fill: #f44336 !important; fill-opacity: ' + fill_opacity + ' !important; stroke: none !important; stroke-width: 0 !important;';
      });
    } else {
      if (debug) console.warn("Circulation desk SVG element not found:", circDeskId);
    }//if ($circ.length) {
}//function highlightCirculationDesk(circDeskId) {

if (debug) console.log("✅ Currently using the " + $('#lib').text() + " branch of logic.");
});
