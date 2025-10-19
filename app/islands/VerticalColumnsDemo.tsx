import { useState, useEffect } from 'hono/jsx'

export default function VerticalColumnsDemo() {
  const [overflow1, setOverflow1] = useState(true)
  const [overflow2, setOverflow2] = useState(false)

  const toggleOverflow1 = () => {
    setOverflow1(!overflow1)
    console.log(`container-1: overflow changed to ${!overflow1 ? 'auto' : 'visible'}`)
  }

  const toggleOverflow2 = () => {
    setOverflow2(!overflow2)
    console.log(`container-2: overflow changed to ${!overflow2 ? 'auto' : 'visible'}`)
  }

  return (
    <>
      <section class="demo-section">
        <h2>デモ1: スクロール親あり（overflow: auto）</h2>
        <p>コンテナのサイズを基準にカラム幅が計算されます</p>
        <button id="toggle-overflow-1" class="toggle-btn" onClick={toggleOverflow1}>
          overflow を切り替え
        </button>
        <div class={`status ${overflow1 ? 'overflow-auto' : 'overflow-visible'}`} id="status-1">
          {overflow1 ? '現在: overflow: auto（スクロール親）' : '現在: overflow なし（ビューポート依存）'}
        </div>
        <div class={`container ${overflow1 ? 'overflow-auto' : 'no-overflow'}`} id="container-1">
          <div class="content vertical-text">
            吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰猛な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はずっと後になって知った。この書生の掌の裏でしばらくはよい心持に坐っておったが、しばらくすると非常な速力で運転し始めた。書生が動くのか自分が動くのか分らないが無暗に眼が廻る。胸が悪くなる。到底助からないと思っていると、どさりと音がして眼から火が出た。それまでは記憶しているがあとは何の事やらいくら考えても分らない。
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>デモ2: スクロール親なし（overflow なし）</h2>
        <p>ビューポートのサイズを基準にカラム幅が計算されます</p>
        <button id="toggle-overflow-2" class="toggle-btn" onClick={toggleOverflow2}>
          overflow を切り替え
        </button>
        <div class={`status ${overflow2 ? 'overflow-auto' : 'overflow-visible'}`} id="status-2">
          {overflow2 ? '現在: overflow: auto（スクロール親）' : '現在: overflow なし（ビューポート依存）'}
        </div>
        <div class={`container ${overflow2 ? 'overflow-auto' : 'no-overflow'}`} id="container-2">
          <div class="content vertical-text">
            どうも夢らしい。もしくは夢かもしれない。しかし夢にしては妙にはっきりしている。第一こんなに鮮やかな夢は見た事がない。だんだん記憶がもどってくる。そうそうあの書生に拾われたのだ。しかしその後どうしたものか一向記憶がない。何でも非常に寒い冬の夜であった事だけは慥かである。どこに寝ていたか知らぬが寒くて寒くてたまらなかった。そこでにゃあにゃあ鳴いてみた。しかし誰も来ない。しかたがないからそのまま死ぬる覚悟で風の吹く隙間から這い出してそこいらを見廻してみた。どうも人間の住む家らしい。そこで台所へ這入ってみたがやはり何も見えぬ。その時偶然椽の下に這入り込んで暖かそうな所を見つけたからそこで寝る事にした。これが吾輩の家に住む第一日目の記録である。翌日からは主人や家族の顔も段々覚えるようになった。主人は時々書斎に這入って来て何か読んでいる。読んでいるものは吾輩には無論わからぬが、何でも人間の言葉で書いてあるものらしい。時々読みながら首を振っている。あとでこれが書物というものである事を知った。
          </div>
        </div>
      </section>
    </>
  )
}
