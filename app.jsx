const {
  useEffect,
  useMemo,
  useState,
} = React;

// --- Minimal icon set (simple inline SVGs to avoid external deps)
const makeIcon = (paths) => ({ size = 24, strokeWidth = 2, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...rest}
  >
    {paths}
  </svg>
);

const Sparkles = makeIcon([
  <path key="1" d="M12 3v4" />, <path key="2" d="M14 5h-4" />, <path key="3" d="M7 9l2 2-2 2-2-2 2-2Z" />, <path key="4" d="m17 11 3 3-3 3-3-3 3-3Z" />,
]);
const Star = makeIcon(<polygon points="12 2 14.9 8.6 22 9.2 16.5 13.9 18.2 21 12 17.2 5.8 21 7.5 13.9 2 9.2 9.1 8.6 12 2" />);
const Users = makeIcon([
  <circle key="1" cx="9" cy="7" r="3" />, <circle key="2" cx="17" cy="9" r="2.5" />, <path key="3" d="M4 19c1.2-2.4 3-4 5.5-4s4.3 1.6 5.5 4" />, <path key="4" d="M14.5 19c.5-1.6 1.6-3 3.3-3 1 0 1.9.4 2.7 1.1" />,
]);
const Handshake = makeIcon([
  <path key="1" d="M3 12 8 7l4 4 4-4 5 5" />, <path key="2" d="M8 17 6 15" />, <path key="3" d="M10 17 8 15" />, <path key="4" d="M12 17 10 15" />, <path key="5" d="M14 15 16 17" />, <path key="6" d="M4 8h3" />, <path key="7" d="M17 8h3" />,
]);
const TrendingUp = makeIcon(<polyline points="3 17 9 11 13 15 21 7" />);
const Archive = makeIcon([
  <rect key="1" x="3" y="4" width="18" height="4" rx="1" />, <path key="2" d="M5 8v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" />, <path key="3" d="M10 12h4" />,
]);
const Crown = makeIcon([
  <path key="1" d="M3 8 7 5l5 6 5-6 4 3-2 9H5L3 8Z" />, <path key="2" d="M8 14h8" />,
]);
const Wrench = makeIcon([
  <path key="1" d="M21 16.8a4 4 0 0 1-5.8-5L10 6l2-2 5.2 5.2a4 4 0 0 1 3.8 7.6Z" />, <path key="2" d="m7 11-5 5 3 3 5-5" />,
]);
const ArrowRight = makeIcon(<path d="M5 12h14m-6-6 6 6-6 6" />);
const RefreshCw = makeIcon([
  <polyline key="1" points="23 4 23 10 17 10" />, <polyline key="2" points="1 20 1 14 7 14" />, <path key="3" d="M3.51 9a9 9 0 0 1 14.86-3.36L23 10M1 14l4.63 4.63A9 9 0 0 0 20.49 15" />,
]);
const BarChart = makeIcon([
  <rect key="1" x="3" y="9" width="4" height="12" rx="1" />, <rect key="2" x="10" y="3" width="4" height="18" rx="1" />, <rect key="3" x="17" y="13" width="4" height="8" rx="1" />,
]);
const CheckCircle = makeIcon([
  <circle key="1" cx="12" cy="12" r="10" />, <path key="2" d="m9 12 2 2 4-5" />,
]);
const Smartphone = makeIcon([
  <rect key="1" x="7" y="3" width="10" height="18" rx="2" />, <path key="2" d="M11 7h2" />, <path key="3" d="M12 17.5v.01" />,
]);

// ==========================================
// 画像設定エリア（必要なら差し替え）
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
};

// CTAリンク（任意）
const LINE_URL = "https://line.me/R/ti/p/@example";

// 8プロファイル定義
const typeInfo = {
  creator: {
    name: "CREATOR",
    jp: "クリエイター",
    subtitle: "よりよい製品を作る",
    icon: Sparkles,
    color: "text-orange-600",
    bgGradient: "from-orange-400 to-rose-400",
    lightBg: "bg-orange-50",
    borderColor: "border-orange-200",
    description:
      "アイデアを形にして世界を更新するタイプ。未完成でも走り出して検証し、磨いていくほど強くなる。",
    strengths: ["0→1の発想", "試作→学習", "価値提案", "制作の粘り"],
    fitMoves: ["プロトタイプ作成", "新規企画", "商品/サービス改善", "ユーザー課題の再定義"],
  },
  star: {
    name: "STAR",
    jp: "スター",
    subtitle: "よりよいブランドを構築する",
    icon: Star,
    color: "text-pink-600",
    bgGradient: "from-pink-400 to-fuchsia-500",
    lightBg: "bg-pink-50",
    borderColor: "border-pink-200",
    description:
      "注目と共感を集め、価値を“見える化”して拡張するタイプ。発信・表現・物語化で成果が伸びる。",
    strengths: ["発信力", "魅せ方", "空気を読む", "ストーリー設計"],
    fitMoves: ["SNS/PR運用", "ブランド設計", "登壇・プレゼン", "コンテンツ企画"],
  },
  supporter: {
    name: "SUPPORTER",
    jp: "サポーター",
    subtitle: "チームを率いる",
    icon: Users,
    color: "text-amber-700",
    bgGradient: "from-amber-400 to-orange-400",
    lightBg: "bg-amber-50",
    borderColor: "border-amber-200",
    description:
      "関係性と信頼で人を動かし、場を前に進めるタイプ。メンバーの力を引き出す設計が得意。",
    strengths: ["共感・伴走", "育成", "調整力", "心理的安全性づくり"],
    fitMoves: ["チーム運営", "オンボーディング", "コミュニティ設計", "顧客伴走"],
  },
  dealmaker: {
    name: "DEAL MAKER",
    jp: "ディールメーカー",
    subtitle: "適切なときに適切な人をつなぐ",
    icon: Handshake,
    color: "text-red-600",
    bgGradient: "from-red-400 to-orange-500",
    lightBg: "bg-red-50",
    borderColor: "border-red-200",
    description:
      "交渉・接続・タイミングでチャンスを作るタイプ。『誰と誰を、どの順で』が見えている。",
    strengths: ["交渉", "紹介・提携", "案件化", "関係資本の運用"],
    fitMoves: ["提携開拓", "営業・BD", "アライアンス", "マッチング設計"],
  },
  trader: {
    name: "TRADER",
    jp: "トレーダー",
    subtitle: "安く買って高く売る",
    icon: TrendingUp,
    color: "text-emerald-700",
    bgGradient: "from-emerald-400 to-teal-500",
    lightBg: "bg-emerald-50",
    borderColor: "border-emerald-200",
    description:
      "現場感覚と相場観で“いま”の最適を取るタイプ。速い仮説検証・回転が武器。",
    strengths: ["相場観", "短期最適化", "売買・販売", "意思決定の速さ"],
    fitMoves: ["セールス運用", "価格設計", "広告運用の最適化", "KPI改善"],
  },
  accumulator: {
    name: "ACCUMULATOR",
    jp: "アキュムレーター",
    subtitle: "いずれ価値の上がる資産を集める",
    icon: Archive,
    color: "text-slate-700",
    bgGradient: "from-slate-400 to-gray-500",
    lightBg: "bg-slate-50",
    borderColor: "border-slate-200",
    description:
      "下調べ→蓄積→長期で価値化が得意なタイプ。リスクを見て、静かに勝ち筋を積む。",
    strengths: ["リサーチ", "蓄積", "長期設計", "リスク管理"],
    fitMoves: ["情報収集・分析", "資産形成", "知識DB構築", "長期戦略"],
  },
  lord: {
    name: "LORD",
    jp: "ロード",
    subtitle: "お金を生み出す資産を支配する",
    icon: Crown,
    color: "text-indigo-700",
    bgGradient: "from-indigo-400 to-slate-500",
    lightBg: "bg-indigo-50",
    borderColor: "border-indigo-200",
    description:
      "細部・ルール・管理でキャッシュフローを最大化するタイプ。仕組みと統制で勝つ。",
    strengths: ["管理", "統制", "コスト最適化", "意思決定の基準化"],
    fitMoves: ["組織設計", "PL/予算管理", "オペレーション統制", "資産運用の仕組み化"],
  },
  mechanic: {
    name: "MECHANIC",
    jp: "メカニック",
    subtitle: "よりよいシステムを編み出す",
    icon: Wrench,
    color: "text-cyan-700",
    bgGradient: "from-cyan-400 to-blue-500",
    lightBg: "bg-cyan-50",
    borderColor: "border-cyan-200",
    description:
      "仕組み化・改善・完成度で価値を出すタイプ。再現性あるシステムを作るほど強い。",
    strengths: ["設計", "改善", "自動化", "品質・再現性"],
    fitMoves: ["業務設計", "仕組み化/自動化", "品質改善", "プロセス最適化"],
  },
};

const TYPE_KEYS = Object.keys(typeInfo);

// 初期スコア
const initialScores = TYPE_KEYS.reduce((acc, k) => {
  acc[k] = 0;
  return acc;
}, {});

// 質問（12問）
// ※各 option.scores は 8キーを持つ（省略不可だと面倒なので、足し込み時に存在チェックで対応）
const questions = [
  {
    id: 1,
    text: "新しいアイデアが浮かんだ。最初にやるのは？",
    icon: Sparkles,
    options: [
      { text: "すぐ形にして試す（プロトタイプから）", scores: { creator: 3, mechanic: 1 } },
      { text: "人に話して反応を見て育てる", scores: { star: 2, supporter: 1, dealmaker: 1 } },
      { text: "調べて裏取りし、長期で育てる", scores: { accumulator: 3, lord: 1 } },
    ],
  },
  {
    id: 2,
    text: "成果の出し方としてワクワクするのは？",
    icon: TrendingUp,
    options: [
      { text: "改善の積み重ねで、数字を伸ばす", scores: { trader: 3, mechanic: 1 } },
      { text: "仕組みを作って、安定して回る状態にする", scores: { mechanic: 2, lord: 2 } },
      { text: "強い価値を作って、圧倒的に刺す", scores: { creator: 2, star: 2 } },
    ],
  },
  {
    id: 3,
    text: "人間関係で得意なのはどれ？",
    icon: Users,
    options: [
      { text: "相手の気持ちを汲んで、場を整える", scores: { supporter: 3, star: 1 } },
      { text: "利害を整理して、合意形成を作る", scores: { dealmaker: 3, lord: 1 } },
      { text: "必要最低限でOK。作業に集中したい", scores: { mechanic: 2, accumulator: 2 } },
    ],
  },
  {
    id: 4,
    text: "何かを買う/選ぶときの基準は？",
    icon: Archive,
    options: [
      { text: "将来価値が上がりそうか（長期視点）", scores: { accumulator: 3, lord: 1 } },
      { text: "いま得かどうか（相場とタイミング）", scores: { trader: 3, dealmaker: 1 } },
      { text: "自分の理想に合うか（体験/品質）", scores: { creator: 2, mechanic: 1, star: 1 } },
    ],
  },
  {
    id: 5,
    text: "あなたが褒められて一番うれしいのは？",
    icon: Star,
    options: [
      { text: "センスがいい・魅せ方がうまい", scores: { star: 3, creator: 1 } },
      { text: "仕組みがうまい・ミスがない", scores: { mechanic: 3, lord: 1 } },
      { text: "判断が速い・結果が出る", scores: { trader: 3, dealmaker: 1 } },
      { text: "安心する・一緒にいると進む", scores: { supporter: 3, dealmaker: 1 } },
    ],
  },
  {
    id: 6,
    text: "仕事でストレスが溜まりやすいのは？",
    icon: BarChart,
    options: [
      { text: "正解がなく、曖昧なまま進むこと", scores: { mechanic: 2, lord: 2 } },
      { text: "変化が少なく、伸びしろが見えないこと", scores: { creator: 2, trader: 1, star: 1 } },
      { text: "人の感情で決まること（理屈が通らない）", scores: { accumulator: 2, mechanic: 1, lord: 1 } },
    ],
  },
  {
    id: 7,
    text: "頼まれると燃えるのはどれ？",
    icon: Handshake,
    options: [
      { text: "この二人、組ませたら強いと思う（紹介/提携）", scores: { dealmaker: 3, supporter: 1 } },
      { text: "とにかく勝ち筋を見つけて伸ばす（数字/改善）", scores: { trader: 3, mechanic: 1 } },
      { text: "根本から作り直して良くする（設計/制作）", scores: { creator: 2, mechanic: 2 } },
    ],
  },
  {
    id: 8,
    text: "お金や資源の扱い方として近いのは？",
    icon: Crown,
    options: [
      { text: "仕組みで増やす（ルールと運用）", scores: { lord: 3, mechanic: 1 } },
      { text: "安く仕入れて高く売る（裁量と回転）", scores: { trader: 3, dealmaker: 1 } },
      { text: "価値が上がるものを集めて育てる", scores: { accumulator: 3, creator: 1 } },
    ],
  },
  {
    id: 9,
    text: "あなたの“学び方”はどれ？",
    icon: Wrench,
    options: [
      { text: "体系化して理解する（構造→手順）", scores: { mechanic: 3, accumulator: 1 } },
      { text: "実戦で試して覚える（回して掴む）", scores: { trader: 3, creator: 1 } },
      { text: "人から吸収する（観察/会話/フィードバック）", scores: { supporter: 2, star: 2, dealmaker: 1 } },
    ],
  },
  {
    id: 10,
    text: "“価値”って結局なにで増えると思う？",
    icon: Sparkles,
    options: [
      { text: "中身（プロダクト/品質）が良いこと", scores: { creator: 3, mechanic: 1 } },
      { text: "見え方（ブランド/物語）が強いこと", scores: { star: 3, supporter: 1 } },
      { text: "流通（売り方/接続/相場）がうまいこと", scores: { trader: 2, dealmaker: 2 } },
      { text: "保有（仕組み/資産/統制）ができていること", scores: { lord: 2, accumulator: 2 } },
    ],
  },
  {
    id: 11,
    text: "あなたが“勝てる環境”は？",
    icon: Users,
    options: [
      { text: "自由度が高く、作って試せる", scores: { creator: 2, trader: 1, star: 1 } },
      { text: "ルールが明確で、改善できる", scores: { mechanic: 2, lord: 2 } },
      { text: "人が多く、関係性が資産になる", scores: { supporter: 2, dealmaker: 2, star: 1 } },
      { text: "情報が多く、長期で積める", scores: { accumulator: 3, lord: 1 } },
    ],
  },
  {
    id: 12,
    text: "最後に。あなたの“自然なクセ”に近いのは？",
    icon: CheckCircle,
    options: [
      { text: "つい改善点を見つけて直したくなる", scores: { mechanic: 3, lord: 1 } },
      { text: "つい面白い人を繋ぎたくなる", scores: { dealmaker: 3, supporter: 1 } },
      { text: "つい発信・表現したくなる", scores: { star: 3, creator: 1 } },
      { text: "つい情報を集めて蓄えたくなる", scores: { accumulator: 3, lord: 1 } },
    ],
  },
];

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function getTopTypes(scores) {
  const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top1 = entries[0];
  const top2 = entries[1] ?? entries[0];
  return { top1, top2, sorted: entries };
}

function WealthDynamics8ProfileDiagnosis() {
  const [phase, setPhase] = useState("intro"); // intro | quiz | result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState(initialScores);
  const [animationClass, setAnimationClass] = useState("animate-fade-in");

  useEffect(() => {
    setAnimationClass("animate-fade-in");
    const t = setTimeout(() => setAnimationClass(""), 500);
    return () => clearTimeout(t);
  }, [phase, currentQuestion]);

  const handleStart = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPhase("quiz");
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    const newScores = { ...scores };
    for (const key of TYPE_KEYS) {
      const add = option.scores?.[key] ?? 0;
      newScores[key] += add;
    }
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion((p) => p + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 250);
    } else {
      setTimeout(() => {
        setPhase("result");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 400);
    }
  };

  const restartQuiz = () => {
    setPhase("intro");
    setCurrentQuestion(0);
    setAnswers([]);
    setScores(initialScores);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { top1, top2, sorted } = useMemo(() => getTopTypes(scores), [scores]);
  const resultKey = top1?.[0] ?? "creator";
  const secondKey = top2?.[0] ?? resultKey;

  const ResultIcon = typeInfo[resultKey].icon;
  const SecondIcon = typeInfo[secondKey].icon;

  const maxScore = useMemo(() => Math.max(1, ...Object.values(scores)), [scores]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 selection:bg-orange-200 overflow-x-hidden">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        .glass-button {
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>

      {/* 背景装飾 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-gradient-to-tr from-blue-100/30 to-purple-100/30 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: "10s" }}
        />
        <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-gradient-to-r from-yellow-100/20 to-orange-100/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* ヘッダー */}
        {phase !== "result" && (
          <header
            className={`text-center mb-6 transition-all duration-500 ${
              phase === "intro" ? "mt-4" : "mt-0"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/50 shadow-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-orange-600 text-xs font-bold tracking-widest">
                8 PROFILE DIAGNOSIS
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight mb-2 tracking-tight">
              Wealth Dynamics<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">
                8プロファイル診断
              </span>
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              ※入門セルフチェック（簡易版）
            </p>
          </header>
        )}

        {/* イントロ */}
        {phase === "intro" && (
          <div
            className={`glass-panel rounded-[2.5rem] shadow-xl p-6 md:p-8 ${animationClass} flex-1 flex flex-col`}
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-orange-100/50 mb-8 group ring-1 ring-black/5">
              <img
                src={IMAGES.hero}
                alt="Diagnosis Main Visual"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="inline-block px-3 py-1 bg-orange-500 rounded-full text-[10px] font-bold tracking-wider mb-2 shadow-lg">
                  無料診断
                </p>
                <h2 className="text-xl font-bold leading-snug text-shadow-sm">
                  あなたの「価値の出し方」<br />
                  どの型？
                </h2>
              </div>
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-600 font-medium leading-relaxed">
                12の質問に答えるだけで、<br />
                あなたの<strong className="text-orange-500">強みの発揮パターン</strong>
                が見えます。
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-8">
              {TYPE_KEYS.map((key) => {
                const info = typeInfo[key];
                const Icon = info.icon;
                return (
                  <div
                    key={key}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center border border-white/50 shadow-sm"
                  >
                    <div
                      className={`w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br ${info.bgGradient} flex items-center justify-center text-white shadow-md transform scale-90`}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="font-black text-[10px] text-gray-700 leading-tight">
                      {info.name}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto">
              <button
                onClick={handleStart}
                className="group relative w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-orange-200 hover:-translate-y-1 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  診断をはじめる
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <p className="text-center text-gray-400 text-xs mt-4">所要時間：約2分</p>
            </div>
          </div>
        )}

        {/* クイズ */}
        {phase === "quiz" && (
          <div
            className={`glass-panel rounded-[2.5rem] shadow-xl p-6 md:p-8 ${animationClass} flex-1 flex flex-col`}
          >
            {/* プログレス */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xs font-bold text-gray-400 tracking-wider">QUESTION</span>
                <span className="text-2xl font-black text-gray-800 font-mono">
                  {currentQuestion + 1}
                  <span className="text-sm text-gray-400 font-medium">/{questions.length}</span>
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(251,146,60,0.5)]"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* 質問 */}
            <div className="mb-8 flex-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 mb-6 shadow-sm">
                {(() => {
                  const QIcon = questions[currentQuestion].icon;
                  return <QIcon size={24} />;
                })()}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
                {questions[currentQuestion].text}
              </h2>
            </div>

            {/* 選択肢 */}
            <div className="space-y-3 mt-auto">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="glass-button w-full flex items-center gap-4 p-5 rounded-2xl border border-white hover:border-orange-200 hover:bg-orange-50 active:scale-[0.98] text-left group"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 font-bold text-sm group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 font-medium text-gray-700 group-hover:text-orange-900 transition-colors">
                    {option.text}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-orange-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 結果 */}
        {phase === "result" && (
          <div
            className={`bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-orange-100/50 overflow-hidden border border-white/50 ${animationClass}`}
          >
            {/* ヘッダー */}
            <div className={`relative p-10 text-center overflow-hidden`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${typeInfo[resultKey].bgGradient} opacity-100`} />
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <p className="inline-block px-4 py-1 rounded-full bg-black/20 text-white text-[10px] font-bold tracking-widest mb-6 backdrop-blur-sm border border-white/10">
                  DIAGNOSIS RESULT
                </p>

                <div className="flex justify-center mb-6 gap-3">
                  <div className="p-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-inner">
                      <ResultIcon size={40} className={typeInfo[resultKey].color} />
                    </div>
                  </div>
                  {secondKey !== resultKey && (
                    <div className="p-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow-xl translate-y-2">
                      <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-inner">
                        <SecondIcon size={30} className={typeInfo[secondKey].color} />
                      </div>
                    </div>
                  )}
                </div>

                <h2 className="text-3xl font-extrabold text-white mb-2 drop-shadow-md tracking-tight">
                  {typeInfo[resultKey].name}
                  <span className="text-white/80 text-base font-bold ml-2">
                    （{typeInfo[resultKey].jp}）
                  </span>
                </h2>
                {secondKey !== resultKey && (
                  <p className="text-white/90 text-sm font-medium">
                    2位：{typeInfo[secondKey].name}（{typeInfo[secondKey].jp}）
                  </p>
                )}
                <div className="w-12 h-1 bg-white/50 mx-auto rounded-full my-3" />
                <p className="text-white/90 font-medium text-sm">
                  {typeInfo[resultKey].subtitle}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* 説明 */}
              <div
                className={`p-6 rounded-2xl ${typeInfo[resultKey].lightBg} border ${typeInfo[resultKey].borderColor} relative`}
              >
                <div className="absolute -top-3 left-6 px-2 bg-white text-2xl text-orange-400">
                  ❝
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">
                  {typeInfo[resultKey].description}
                </p>
              </div>

              {/* スコア可視化 */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">
                  <BarChart className="w-4 h-4" />
                  8プロファイル スコア
                </h3>

                <div className="space-y-3">
                  {sorted.map(([key, val]) => {
                    const info = typeInfo[key];
                    const pct = clamp((val / maxScore) * 100, 0, 100);
                    return (
                      <div key={key} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${info.bgGradient} flex items-center justify-center text-white shadow-sm`}>
                              <info.icon size={16} />
                            </div>
                            <div className="leading-tight">
                              <div className="font-black text-sm text-gray-800">{info.name}</div>
                              <div className="text-[11px] text-gray-500 font-medium">{info.jp}</div>
                            </div>
                          </div>
                          <div className="font-mono font-black text-gray-800 text-sm">{val}</div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${info.bgGradient} rounded-full transition-all duration-700`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-[11px] text-gray-500 mt-3 leading-relaxed">
                  ※これは「入門セルフチェック」。本格診断ではなく、あなたの傾向を掴むための簡易推定です。
                </p>
              </div>

              {/* 強み */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4" />
                  強みが出やすいポイント
                </h3>
                <div className="flex flex-wrap gap-2">
                  {typeInfo[resultKey].strengths.map((t, i) => (
                    <span
                      key={i}
                      className={`px-4 py-2 bg-white border ${typeInfo[resultKey].borderColor} ${typeInfo[resultKey].color} rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all cursor-default`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* 次の一手 */}
              <div className="bg-gray-900 rounded-[2rem] shadow-2xl overflow-hidden">
                <div className="relative p-8 text-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 mb-4 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">次の一手（おすすめ）</h3>
                    <ul className="text-gray-300 text-sm leading-relaxed space-y-2 mb-6">
                      {typeInfo[resultKey].fitMoves.map((m, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-orange-300 font-black">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={LINE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-all active:scale-98 group"
                    >
                      <Smartphone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                      <span>LINEで無料アドバイスを見る</span>
                    </a>
                    <p className="text-[10px] text-gray-500 mt-4">
                      ※ いつでもブロック可能です。無理な勧誘はありません。
                    </p>
                  </div>
                </div>
              </div>

              {/* 再診断 */}
              <button
                onClick={restartQuiz}
                className="flex items-center justify-center gap-2 w-full py-4 text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                <span>最初から診断し直す</span>
              </button>
            </div>
          </div>
        )}

        <footer className="text-center py-8 text-gray-400 text-[10px] font-medium tracking-widest opacity-60">
          © 2025 8 PROFILE DIAGNOSIS
        </footer>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<WealthDynamics8ProfileDiagnosis />);
