// ユーザーに音声再生の許可を求める関数
function requestAudioPermission() {
  // ブラウザがWeb Audio APIをサポートしているか確認
  if (window.AudioContext || window.webkitAudioContext) {
    // Web Audio APIを初期化
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // ダミーの音声ノードを作成
    var oscillator = audioContext.createOscillator();
    
    // 音声再生の準備をする
    oscillator.connect(audioContext.destination);
    
    // 音声再生を開始し、すぐに停止する（音声を実際に再生しない）
    oscillator.start();
    oscillator.stop(audioContext.currentTime);
    
    // ユーザーの入力を待ち、音声再生の許可を求める
    if (audioContext.state === 'suspended') {
      audioContext.resume().then(function() {
        console.log('音声再生の許可が与えられました。');
      });
    }
  } else {
    console.log('Web Audio APIがこのブラウザでサポートされていません。');
  }
}

// ページのロード後、自動的に音声再生の許可を求める
window.addEventListener('load', function() {
  requestAudioPermission();
});
