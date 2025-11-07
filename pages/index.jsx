/* 
BE CHÍ CỐT — Microsite (single-file React page)
Dán file này vào: /pages/index.jsx trong Next.js project.
Trang này bao gồm toàn bộ flow: chọn học sinh/sinh viên → timetable → UGC → tạo certificate → chia sẻ Facebook.
*/

import React, { useState, useRef, useEffect } from 'react'

export default function BeChiCotMicrosite() {
  // Basic states
  const [role, setRole] = useState(null) // 'student' | 'pupil'
  const [step, setStep] = useState('chooseRole')

  // Timetable mock data
  const defaultTimetables = {
    pupil: [
      { id: 1, title: 'Pupil — Sáng 7:00', items: ['Toán', 'Tiếng Việt', 'Thể dục'] },
      { id: 2, title: 'Pupil — Chiều 13:30', items: ['Tiếng Anh', 'Khoa học', 'Nghệ thuật'] }
    ],
    student: [
      { id: 10, title: 'Sinh viên — Ca Sáng', items: ['Lớp 8:00', 'Lab 10:00', 'Ăn trưa 12:00'] },
      { id: 11, title: 'Sinh viên — Ca Tối', items: ['Học nhóm 18:00', 'Thực hành 20:00'] }
    ]
  }

  const serviceInsert = 'Be insert: Gói chăm sóc 1' // ví dụ dịch vụ Be

  const [selectedTimetable, setSelectedTimetable] = useState(null)
  const [suggestedTimetable, setSuggestedTimetable] = useState(null)
  const [customChoices, setCustomChoices] = useState([])

  // UGC states
  const initialUGC = { feelings: [], story: '', promises: [] }
  const [ugc, setUgc] = useState(initialUGC)

  // Certificate canvas ref
  const canvasRef = useRef(null)

  // On role chosen
  function chooseRole(r) {
    setRole(r)
    setStep('pickTimetable')
  }

  function pickTimetable(t) {
    setSelectedTimetable(t)
    const alt = { ...t, title: t.title + ' — Suggest with Be', items: [...t.items, serviceInsert] }
    setSuggestedTimetable(alt)
    setStep('suggestTimetable')
  }

  function acceptSuggestion() {
    setSelectedTimetable(suggestedTimetable)
    setStep('ugcIntro')
  }

  function changeDish() {
    const choices = [
      { id: 's1', title: 'Gợi ý 1', items: [...selectedTimetable.items.slice(0, -1), 'Be món A'] },
      { id: 's2', title: 'Gợi ý 2', items: [...selectedTimetable.items.slice(0, -1), 'Be món B'] },
      { id: 's3', title: 'Gợi ý 3', items: [...selectedTimetable.items.slice(0, -1), 'Be món C'] }
    ]
    setCustomChoices(choices)
    setStep('chooseAlternative')
  }

  function chooseAlternative(choice) {
    setSelectedTimetable(choice)
    setStep('ugcIntro')
  }

  // UGC options
  const feelingsOptions = [
    'Dễ thương phết chứ không đùa',
    'Có tâm hơn cả ny cũ luôn á',
    'Mượt mà, xịn xò, nói chung là “ưng cái bụng”',
    'Nói ít hiểu nhiều, chuẩn chí cốt',
    'Tưởng đâu bạn thân từ kiếp trước',
    'Giảm sức mạnh con tướng này giúp em',
    'Hiểu mình hơn cả mình, đỉnh thiệt',
    'Mượt hơn Sunsilk lun mom',
    'Tưởng toang lại hóa nhịp nhàng',
    'Tán là đổ liền luôn nè'
  ]

  const promisesOptions = [
    'Đi học/ làm đúng giờ mỗi sáng',
    'Ăn khuya sau deadline',
    'Giao thư tình cho crush',
    'Dọn nhà đón niềm vui mới',
    'Đón người yêu ở sân bay',
    'Đi du lịch cuối năm',
    'Sống sót qua mùa mưa gió',
    'Đi nhậu/bonding cuối năm',
    'Công phá 7749 trò chơi',
    'Đi dạo đêm quanh thành phố'
  ]

  function toggleFeeling(f) {
    setUgc(u => {
      const has = u.feelings.includes(f)
      return { ...u, feelings: has ? u.feelings.filter(x => x !== f) : [...u.feelings, f] }
    })
  }
  function togglePromise(p) {
    setUgc(u => {
      const has = u.promises.includes(p)
      return { ...u, promises: has ? u.promises.filter(x => x !== p) : [...u.promises, p] }
    })
  }

  function submitUGC() {
    generateCertificate()
    setStep('certificate')
  }

  function resetAll() {
    setRole(null)
    setStep('chooseRole')
    setSelectedTimetable(null)
    setSuggestedTimetable(null)
    setCustomChoices([])
    setUgc(initialUGC)
    const c = canvasRef.current
    if (c) {
      const ctx = c.getContext('2d')
      ctx.clearRect(0, 0, c.width, c.height)
    }
  }

  // Certificate generation
  function generateCertificate() {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    const W = 1200, H = 675
    c.width = W; c.height = H

    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, W, H)

    ctx.fillStyle = '#111827'
    ctx.font = '40px serif'
    ctx.fillText('Chứng nhận Be Chí Cốt', 50, 80)

    ctx.font = '24px serif'
    const nameLine = `Role: ${role === 'student' ? 'Sinh viên' : 'Học sinh'}`
    ctx.fillText(nameLine, 50, 140)
    ctx.fillText(`Timetable: ${selectedTimetable?.title || ''}`, 50, 180)

    ctx.fillText('Cảm nghĩ: ' + (ugc.feelings.slice(0, 3).join(' | ') || '-'), 50, 230)

    ctx.font = '20px serif'
    wrapText(ctx, `Kỷ niệm: ${ugc.story || ''}`, 50, 280, W - 100, 26)

    ctx.font = '20px serif'
    wrapText(ctx, 'Hứa hẹn: ' + (ugc.promises.join(', ') || '-'), 50, 400, W - 100, 22)

    ctx.font = '30px serif'
    ctx.fillText('— Be Chí Cốt', W - 300, H - 60)
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ')
    let line = ''
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' '
      const metrics = ctx.measureText(testLine)
      const testWidth = metrics.width
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y)
        line = words[n] + ' '
        y += lineHeight
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, x, y)
  }

  function downloadCertificate() {
    const c = canvasRef.current
    if (!c) return
    const url = c.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'be-chi-cot-certificate.png'
    a.click()
  }

  function shareToFacebook() {
    const quoteParts = []
    if (ugc.feelings.length) quoteParts.push(ugc.feelings[0])
    if (ugc.story) quoteParts.push(ugc.story)
    const quote = encodeURIComponent(quoteParts.join(' — '))
    const shareUrl = encodeURIComponent(window.location.href)
    const fb = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${quote}`
    window.open(fb, '_blank', 'noopener')
  }

  useEffect(() => {
    if (step === 'certificate') generateCertificate()
  }, [step])

return (
  <div
  className="min-h-screen bg-cover bg-center relative"
  style={{ backgroundImage: "url('/bg.png')" }}
>
  <div className="absolute inset-0 bg-black/40" />
  <div className="relative z-10 p-6 min-h-screen flex items-center justify-center">
    <div className="max-w-4xl mx-auto bg-white/85 backdrop-blur-md rounded-2xl shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-yellow-700 drop-shadow">
        Be Chí Cốt — Microsite trải nghiệm
      </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
  <button onClick={() => chooseRole('pupil')} className="focus:outline-none hover:scale-105 transition-transform">
    <img
      src="/nguoidilam.png"
      alt="Người đi làm"
      className="w-56 h-auto rounded-xl shadow-lg hover:shadow-2xl"
    />
  </button>

  <button onClick={() => chooseRole('student')} className="focus:outline-none hover:scale-105 transition-transform">
    <img
      src="/sinhvien.png"
      alt="Sinh viên"
      className="w-56 h-auto rounded-xl shadow-lg hover:shadow-2xl"
    />
  </button>
</div>

        {step === 'pickTimetable' && (
          <div>
            <h2 className="font-semibold">Chọn timetable phù hợp</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {(role === 'pupil' ? defaultTimetables.pupil : defaultTimetables.student).map(t => (
                <div key={t.id} className="border p-3 rounded">
                  <h3 className="font-medium">{t.title}</h3>
                  <ul className="text-sm mt-2">{t.items.map((it, idx) => <li key={idx}>• {it}</li>)}</ul>
                  <div className="mt-2 flex gap-2">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={() => pickTimetable(t)}>Chọn</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'suggestTimetable' && suggestedTimetable && (
          <div>
            <h2 className="font-semibold">Gợi ý timetable bao gồm dịch vụ Be</h2>
            <div className="border p-4 rounded mt-3">
              <h3 className="font-medium">{suggestedTimetable.title}</h3>
              <ul className="mt-2 text-sm">{suggestedTimetable.items.map((it, i) => <li key={i}>• {it}</li>)}</ul>
              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={acceptSuggestion}>Accept</button>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={changeDish}>Đổi món</button>
                <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setStep('pickTimetable')}>Quay lại</button>
              </div>
            </div>
          </div>
        )}

        {step === 'chooseAlternative' && (
          <div>
            <h2 className="font-semibold">Chọn 1 trong 3 gợi ý thay thế</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              {customChoices.map(c => (
                <div key={c.id} className="border p-3 rounded">
                  <h3 className="font-medium">{c.title}</h3>
                  <ul className="text-sm mt-2">{c.items.map((it, i) => <li key={i}>• {it}</li>)}</ul>
                  <button className="mt-3 px-3 py-1 bg-indigo-500 text-white rounded" onClick={() => chooseAlternative(c)}>Chọn</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'ugcIntro' && (
          <div>
            <h2 className="font-semibold">Chia sẻ trải nghiệm (UGC)</h2>
            <p className="text-sm text-gray-600 mt-1">Sau khi hoàn tất, hệ thống sẽ tạo Certificate cho bạn.</p>

            <div className="mt-4">
              <h3 className="font-medium">Step 1 — Cảm nghĩ</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {feelingsOptions.map(f => (
                  <label key={f} className={`p-2 border rounded cursor-pointer ${ugc.feelings.includes(f) ? 'bg-indigo-100 border-indigo-400' : ''}`}>
                    <input type="checkbox" className="mr-2" checked={ugc.feelings.includes(f)} onChange={() => toggleFeeling(f)} />
                    <span className="text-sm">{f}</span>
                  </label>
                ))}
              </div>

              <h3 className="font-medium mt-4">Step 2 — Kể lại kỷ niệm (2–3 dòng)</h3>
              <textarea className="w-full border p-2 rounded mt-2" rows={3} value={ugc.story} onChange={e => setUgc(u => ({ ...u, story: e.target.value }))} placeholder="Viết ngắn gọn, vui nhẹ, wow moment" />

              <h3 className="font-medium mt-4">Step 3 — Hứa hẹn (chọn 2–3)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {promisesOptions.map(p => (
                  <label key={p} className={`p-2 border rounded cursor-pointer ${ugc.promises.includes(p) ? 'bg-emerald-100 border-emerald-400' : ''}`}>
                    <input type="checkbox" className="mr-2" checked={ugc.promises.includes(p)} onChange={() => togglePromise(p)} />
                    <span className="text-sm">{p}</span>
                  </label>
                ))}
              </div>

              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={submitUGC}>Hoàn tất & Tạo Certificate</button>
                <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setStep('pickTimetable')}>Quay lại</button>
              </div>
            </div>
          </div>
        )}

        {step === 'certificate' && (
          <div>
            <h2 className="font-semibold">Certificate của bạn</h2>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="border p-3 rounded flex flex-col items-start">
                <canvas ref={canvasRef} className="w-full max-w-full shadow" style={{ maxWidth: '100%' }} />
                <div className="mt-3 flex gap-2">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={downloadCertificate}>Lưu lại</button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={shareToFacebook}>Chia sẻ</button>
                  <button className="px-4 py-2 bg-gray-300 rounded" onClick={resetAll}>Làm lại</button>
                </div>
                <p className="text-xs text-gray-500 mt-2">*Ghi chú: để đăng ảnh tự động lên Facebook, cần host ảnh trên server.</p>
              </div>

              <div className="p-3">
                <h3 className="font-medium">Tóm tắt</h3>
                <p className="mt-2"><strong>Role:</strong> {role === 'student' ? 'Sinh viên' : 'Học sinh'}</p>
                <p className="mt-1"><strong>Timetable:</strong> {selectedTimetable?.title}</p>
                <p className="mt-1"><strong>Cảm nghĩ:</strong> {ugc.feelings.join(', ')}</p>
                <p className="mt-1"><strong>Kỷ niệm:</strong> {ugc.story}</p>
                <p className="mt-1"><strong>Hứa hẹn:</strong> {ugc.promises.join(', ')}</p>
              </div>
            </div>
          </div>
       )}
      </div> 
    </div>   
  </div>     
)
}
