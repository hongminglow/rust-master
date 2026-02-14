import { Terminal, Code2, ShieldAlert, Cpu, Zap } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="tutorial-page">
      <section className="tutorial-section">
        <div className="card" style={{ border: '1px solid rgba(96, 165, 250, 0.3)', background: 'rgba(96, 165, 250, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Zap size={32} className="text-blue-400" />
            <h2>0. Comparative Overview: Why Rust?</h2>
          </div>
          <div className="tutorial-content">
            <p style={{ marginBottom: '1.5rem' }}>
              Before we dive into syntax, here is how Rust levels up your backend game compared to Node.js.
            </p>
            <div className="comparison-grid" style={{ gridTemplateColumns: '1fr', gap: '1rem' }}>
              <div className="card" style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Feature</th>
                        <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Node.js</th>
                        <th style={{ padding: '0.75rem', color: '#60a5fa' }}>Rust (The Winner)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Memory</td>
                        <td style={{ padding: '0.75rem' }}>Garbage Collector (Heavy)</td>
                        <td style={{ padding: '0.75rem', color: '#34d399' }}>Ownership (Zero-Cost)</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Speed</td>
                        <td style={{ padding: '0.75rem' }}>Fast (JIT Compiled)</td>
                        <td style={{ padding: '0.75rem', color: '#34d399' }}>Native Speed (Compiled)</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Safety</td>
                        <td style={{ padding: '0.75rem' }}>Runtime Dynamic Checks</td>
                        <td style={{ padding: '0.75rem', color: '#34d399' }}>Compile-time Strictness</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Concurrency</td>
                        <td style={{ padding: '0.75rem' }}>Single Event Loop</td>
                        <td style={{ padding: '0.75rem', color: '#34d399' }}>Fearless Multi-threading</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tutorial-section">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Code2 size={32} className="text-blue-400" />
            <h2>1. Variables & Mutability</h2>
          </div>
          <p className="tutorial-content">
            In Rust, variables are <strong>immutable</strong> by default. This is a core philosophy to prevent accidental state changes.
          </p>
          <div className="comparison-grid">
            <div>
              <span className="lang-label">Node.js (Lax)</span>
              <pre><code>let x = 5;<br/>x = 6; <span className="comment">// No problem</span></code></pre>
            </div>
            <div>
              <span className="lang-label">Rust (Strict)</span>
              <pre><code>let <span className="keyword">mut</span> x = 5;<br/>x = 6; <span className="comment">// Needs 'mut' to change</span></code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="tutorial-section">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Cpu size={32} className="text-purple-400" />
            <h2>2. Control Flow & Pattern Matching</h2>
          </div>
          <p className="tutorial-content">
            Rust uses <code>match</code> instead of a traditional <code>switch</code>. It's more powerful and requires you to handle <strong>every possible case</strong>.
          </p>
          <div className="comparison-grid">
            <div>
              <span className="lang-label">Node.js (Switch)</span>
              <pre><code>switch(color) &#123;<br/>  case "red": ...<br/>  default: ...<br/>&#125;</code></pre>
            </div>
            <div>
              <span className="lang-label">Rust (Match)</span>
              <pre><code><span className="keyword">match</span> color &#123;<br/>  <span className="string">"red"</span> =&gt; println!(<span className="string">"Fire!"</span>),<br/>  _ =&gt; println!(<span className="string">"Others"</span>),<br/>&#125;</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="tutorial-section">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <ShieldAlert size={32} className="text-red-400" />
            <h2>3. Concurrency: Arc & RwLock</h2>
          </div>
          <p className="tutorial-content">
            In our <strong>Playground API</strong>, we use <code>Arc&lt;RwLock&lt;Vec&lt;T&gt;&gt;&gt;</code>. Here is why:
          </p>
          <ul className="tutorial-content" style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
            <li><strong>Arc</strong> (Atomic Reference Count): Allows multiple parts of your code to "own" the same data safely across threads.</li>
            <li><strong>RwLock</strong> (Read-Write Lock): Ensures only one part can write to the data, but many can read at the same time.</li>
          </ul>
          <pre><code><span className="comment">// Shared state initialization</span><br/><span className="keyword">let</span> state = Arc::new(RwLock::new(Vec::new()));<br/><br/><span className="comment">// Reading safely</span><br/><span className="keyword">let</span> items = state.read().unwrap();</code></pre>
          <p className="tutorial-content" style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
            <em>*This pattern is how Rust avoids "Data Races" that crash Node.js or C++ apps when many users hit the same endpoint.</em>
          </p>
        </div>
      </section>

      <section className="tutorial-section">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Terminal size={32} className="text-yellow-400" />
            <h2>4. Arrays & Vectors (Lists)</h2>
          </div>
          <p className="tutorial-content">
            Rust has fixed-size <strong>Arrays</strong> and dynamic <strong>Vectors</strong>. In Node.js, everything is just a dynamic array.
          </p>
          <div className="comparison-grid">
            <div>
              <span className="lang-label">Node.js (Array)</span>
              <pre><code>const list = [1, 2, 3];<br/>list.push(4); <span className="comment">// Dynamic</span><br/>list.splice(1, 1); <span className="comment">// Remove</span></code></pre>
            </div>
            <div>
              <span className="lang-label">Rust (Vector)</span>
              <pre><code><span className="keyword">let mut</span> v = vec![1, 2, 3];<br/>v.push(4); <span className="comment">// Add</span><br/>v.remove(1); <span className="comment">// Splice replacement</span></code></pre>
            </div>
          </div>
          <p className="tutorial-content" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            *Note: <code>vec!</code> is a macro (denoted by <code>!</code>) that conveniently creates a Vector for you.
          </p>
        </div>
      </section>

      <section className="tutorial-section">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Code2 size={32} className="text-orange-400" />
            <h2>5. Loops & Iteration</h2>
          </div>
          <p className="tutorial-content">
            Rust loops are highly expressive. The <code>for</code> loop is particularly clean for iterating over ranges or collections.
          </p>
          <div className="comparison-grid">
            <div>
              <span className="lang-label">Node.js (Loop)</span>
              <pre><code>for (let i=0; i&lt;5; i++) &#123;<br/>  console.log(i);<br/>&#125;</code></pre>
            </div>
            <div>
              <span className="lang-label">Rust (Loop)</span>
              <pre><code><span className="keyword">for</span> i <span className="keyword">in</span> 0..5 &#123;<br/>  println!(<span className="string">"&#123;&#125;"</span>, i);<br/>&#125;</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="tutorial-section">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Terminal size={32} className="text-pink-400" />
            <h2>6. Structs (Rust "Objects")</h2>
          </div>
          <p className="tutorial-content">
            Rust doesn't have classes in the traditional way. It uses <strong>Structs</strong> to hold data and <code>impl</code> blocks to add behavior.
          </p>
          <div className="comparison-grid">
            <div>
              <span className="lang-label">Node.js (Object)</span>
              <pre><code>const user = &#123;<br/>  id: 1,<br/>  name: "User"<br/>&#125;;</code></pre>
            </div>
            <div>
              <span className="lang-label">Rust (Struct)</span>
              <pre><code><span className="keyword">struct</span> User &#123;<br/>  id: <span className="type">u32</span>,<br/>  name: <span className="type">String</span>,<br/>&#125;<br/><br/><span className="keyword">let</span> u = User &#123; id: 1, ... &#125;;</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="tutorial-section">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <ShieldAlert size={32} className="text-cyan-400" />
            <h2>7. Option & Result (No More Null!)</h2>
          </div>
          <p className="tutorial-content">
            Rust doesn't have <code>null</code>. If a value might be missing, we use <code>Option</code>. If a function might fail, we use <code>Result</code>.
          </p>
          <div className="comparison-grid">
            <div>
              <span className="lang-label">Node.js (Throw/Null)</span>
              <pre><code>if (!user) return null;<br/>try &#123;<br/>  findUser();<br/>&#125; catch (e) &#123; ... &#125;</code></pre>
            </div>
            <div>
              <span className="lang-label">Rust (Enums)</span>
              <pre><code><span className="type">Option</span>&lt;User&gt; <span className="comment">// Some(u) or None</span><br/><span className="type">Result</span>&lt;T, E&gt; <span className="comment">// Ok(val) or Err(e)</span><br/><br/><span className="keyword">match</span> result &#123; ... &#125;</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="tutorial-section">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Terminal size={32} className="text-green-400" />
            <h2>8. Enums with Data (The Game Changer)</h2>
          </div>
          <p className="tutorial-content">
            In C or Java, enums are just a list of numbers. In Rust, Enums can hold <strong>actual data</strong>. This is why we use them for things like "API Responses".
          </p>
          <div className="comparison-grid">
            <div>
              <span className="lang-label">Node.js (Mixed Types)</span>
              <pre><code>let status = "success";<br/>let data = &#123; id: 1 &#125;;<br/><span className="comment">// Hard to track types!</span></code></pre>
            </div>
            <div>
              <span className="lang-label">Rust (Smart Enums)</span>
              <pre><code><span className="keyword">enum</span> Response &#123;<br/>  Success(&#123; id: <span className="type">u32</span> &#125;),<br/>  Error(<span className="type">String</span>),<br/>&#125;</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="tutorial-section">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Code2 size={32} className="text-blue-400" />
            <h2>9. Traits (Rust "Interfaces")</h2>
          </div>
          <p className="tutorial-content">
            Rust doesn't use <code>extends</code> for inheritance. Instead, it uses <strong>Traits</strong> to define shared behavior. If a type implements a trait, you know it can perform those actions.
          </p>
          <pre><code><span className="keyword">trait</span> Summary &#123;<br/>  <span className="keyword">fn</span> summarize(&amp;<span className="keyword">self</span>) -&gt; <span className="type">String</span>;<br/>&#125;<br/><br/><span className="keyword">impl</span> Summary <span className="keyword">for</span> User &#123; ... &#125;</code></pre>
        </div>
      </section>

      <section className="tutorial-section">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <ShieldAlert size={32} className="text-orange-400" />
            <h2>10. The `?` Error Operator</h2>
          </div>
          <p className="tutorial-content">
            In backend code, you often have to return an error if a database call fails. The <code>?</code> operator makes this incredibly clean in Rust.
          </p>
          <div className="comparison-grid">
            <div>
              <span className="lang-label">Node.js (Try/Catch)</span>
              <pre><code>try &#123;<br/>  await db.save();<br/>&#125; catch (err) &#123;<br/>  return err;<br/>&#125;</code></pre>
            </div>
            <div>
              <span className="lang-label">Rust (The `?`)</span>
              <pre><code>db.save()?; <span className="comment">// Magic!</span><br/><span className="comment">// It automatically returns </span><br/><span className="comment">// the error if it fails.</span></code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="tutorial-section">
        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.5) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <ShieldAlert size={32} className="text-green-400" />
            <h2>11. Intermediate Tip: Ownership</h2>
          </div>
          <p className="tutorial-content">
            Unlike JavaScript which has a <strong>Garbage Collector</strong>, Rust uses <strong>Ownership</strong>. When a variable goes out of scope, Rust cleans it up <strong>immediately</strong>.
          </p>
          <pre><code>&#123;<br/>  <span className="keyword">let</span> s = String::from(<span className="string">"hello"</span>); <span className="comment">// s is valid</span><br/>&#125; <span className="comment">// s is DROPPED immediately here. No memory leak.</span></code></pre>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '2rem', color: '#475569' }}>
        Found this helpful? You've just leveled up in Rust! 🦀🚀
      </footer>
    </div>
  );
};

export default Documentation;
