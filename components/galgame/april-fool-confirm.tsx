"use client";

import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import Modal from "../modal";

export default function AprilFoolConfirm() {
  const controls = useAnimationControls();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const attemptsRef = useRef(0);
  const [message, setMessage] = useState("我未满18岁");
  const [mousePos, setMousePose] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // 添加事件
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePose({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const buttonCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const distance = Math.sqrt(
      Math.pow(mousePos.x - buttonCenter.x, 2) +
        Math.pow(mousePos.y - buttonCenter.y, 2),
    );

    // run!
    if (distance < 200) {
      const dx = buttonCenter.x - mousePos.x;
      const dy = buttonCenter.y - mousePos.y;

      const currentAttempts = attemptsRef.current;
      const escapeDistance = Math.min(150, 70 + currentAttempts * 10);
      const escapeX = (dx / distance) * escapeDistance;
      const escapeY = (dy / distance) * escapeDistance;

      controls.start({
        x: escapeX,
        y: escapeY,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      });

      setAttempts((prev) => {
        const newAttempts = prev + 1;

        attemptsRef.current = newAttempts;

        if (newAttempts > 20) {
          setMessage("不如点左边的按钮吧");
        }

        return newAttempts;
      });
    }
  }, [mousePos, controls]);

  function handleMouseEnter() {
    const range = Math.min(200, 50 + attempts * 100);

    const newX = Math.random() * range * (Math.random() > 0.5 ? 1 : -1);
    const newY = Math.random() * range * (Math.random() > 0.5 ? 1 : -1);

    controls.set({
      x: newX,
      y: newY,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    });
    setAttempts((prev) => prev + 1);
  }

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div>
        <Modal
          compulsion
          compulsionAction={() => {
            toast("没用的哦, 杂鱼~");
          }}
        >
          <Modal.Open autoOpen opens="AprilFoolConfirm">
            <button className="hidden" />
          </Modal.Open>
          <Modal.Window
            className={
              "text-md absolute top-3/7 left-1/2 flex min-h-56 w-xl -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-[#1c1b22] px-4 pt-6 pb-4 shadow-2xs shadow-black"
            }
            name="AprilFoolConfirm"
          >
            <div className="w-sm text-center text-lg">
              <h2 className="text-2xl/14">注意!⚠️</h2>
              <p>这个网页没有成人内容</p>
              <p>如果你已满18岁请不要进入</p>
              <div className="mt-8 flex items-center justify-between">
                <button
                  className="cursor-pointer text-blue-500 transition-all hover:text-inherit"
                  onClick={() => {
                    setIsOpen(false);
                    toast("乖萝莉, 摸摸头");
                  }}
                >
                  我是小萝莉
                </button>
                <motion.button
                  ref={buttonRef}
                  animate={controls}
                  className={`cursor-pointer text-blue-500 transition-all hover:text-inherit ${buttonClicked ? "hidden" : ""}`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setButtonClicked(true);
                    toast("这个按钮被我删除了哦, 杂鱼~");
                  }}
                  onMouseEnter={handleMouseEnter}
                >
                  {message}
                </motion.button>
              </div>
            </div>
          </Modal.Window>
        </Modal>
      </motion.div>
    </AnimatePresence>
  );
}
