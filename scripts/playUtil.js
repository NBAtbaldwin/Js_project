export const getSoundIdx = (beat) => {
  const drumSoundIdxList = []
  let rows = document.getElementsByClassName(`row-${beat}`);
  rows = Array.from(rows);
  rows.forEach((row, idx1) => {
    let colArr = Array.from(row.childNodes).reverse();
    colArr.forEach((node, idx2) => {
      if (Array.from(node.classList).join('').includes("selected")) {
        drumSoundIdxList.push(idx2 + idx1*12);
      }
    })
  });
  return drumSoundIdxList;
}

export const highlightBeat = (beat, recording) => {
  let rows = document.getElementsByClassName(`row-${beat}`);
  rows = Array.from(rows);
  rows.forEach((row, idx) => {
    let colArr = Array.from(row.childNodes);
    colArr.forEach((node, idx) => {
      recording ? node.classList.add('on-beat-record') : node.classList.add('on-beat');
    })
  });
}

export const unHighlightBeat = (beat, recording) => {
  let beatAlias;
  beat === 0 ? beatAlias = 32 : beatAlias = beat;
  let rows = document.getElementsByClassName(`row-${beatAlias - 1}`);
  rows = Array.from(rows);
  rows.forEach((row, idx) => {
    let colArr = Array.from(row.childNodes);
    colArr.forEach((node, idx) => {
      recording ? node.classList.remove('on-beat-record') : node.classList.remove('on-beat');
    })
  });
}

export const clearAllScenes = (className) => {
  const master = document.getElementById("sequence-master");
  let sequences = master.childNodes;
  sequences = Array.from(sequences);
  sequences.forEach((sequence) => {
    let rows = sequence.childNodes;
    rows = Array.from(rows);
    rows.forEach((row, idx) => {
      let colArr = Array.from(row.childNodes);
      colArr.forEach((node, idx) => {
        node.classList.remove(className);
      })
    });
  });
}

export const clearScene = (index) => {
  const master = document.getElementById("sequence-master");
  let sequences = master.childNodes;
  let sequence = Array.from(sequences)[index+1];
  let rows = sequence.childNodes;
  console.log(rows);
  rows = Array.from(rows);
  rows.forEach((row, idx) => {
    let colArr = Array.from(row.childNodes);
    colArr.forEach((node, idx) => {
      node.classList.remove('selected');
    })
  });
}

export const pitchTransform = (keyIdx) => {
  return Math.pow(10, ((keyIdx*100)*(Math.log10(2)/1200)))
}
