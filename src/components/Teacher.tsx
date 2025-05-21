import { teachers, useAITeacher } from "./../hooks/useAITeacher";
import { Html, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { MathUtils, MeshStandardMaterial, Mesh ,SkinnedMesh,Group} from "three";
import { randInt } from "three/src/math/MathUtils.js";

const ANIMATION_FADE_TIME = 0.5;

export function Teacher({ teacher, ...props }) {
  const group = useRef<Group | null>(null);
  const { scene } = useGLTF(`/models/Teacher_${teacher}.glb`);
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        if (child.material) {
          child.material = new MeshStandardMaterial({
            map: child.material.map,
          });
        }
      }
    });
  }, [scene]);

  const currentMessage = useAITeacher((state: any) => state.currentMessage);
  const loading = useAITeacher((state: any) => state.loading);
  const { animations } = useGLTF(`/models/animations_${teacher}.glb`);
  const { actions, mixer } = useAnimations(animations, group);
  const [animation, setAnimation] = useState("Idle");
  const [thinkingText, setThinkingText] = useState(".");

  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let blinkTimeout: string | number | NodeJS.Timeout | undefined;
    const nextBlink = () => {
      blinkTimeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          nextBlink();
        }, 100);
      }, randInt(1000, 5000));
    };
    nextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  useEffect(() => {
    if (loading) {
      setAnimation("Thinking");
    } else if (currentMessage) {
      setAnimation(randInt(0, 1) ? "Talking" : "Talking2");
    } else {
      setAnimation("Idle");
    }
  }, [currentMessage, loading]);

  useFrame(() => {
    lerpMorphTarget("mouthSmile", 0.2, 0.5);
    lerpMorphTarget("eye_close", blink ? 1 : 0, 0.5);
    for (let i = 0; i <= 21; i++) {
      lerpMorphTarget(i.toString(), 0, 0.1);
    }

    if (
      currentMessage &&
      currentMessage.visemes &&
      currentMessage.audioPlayer
    ) {
      for (let i = currentMessage.visemes.length - 1; i >= 0; i--) {
        const viseme = currentMessage.visemes[i];
        if (currentMessage.audioPlayer.currentTime * 1000 >= viseme[0]) {
          lerpMorphTarget(viseme[1], 1, 0.2);
          break;
        }
      }

      if (
        actions[animation] &&
        actions[animation].time >
          actions[animation].getClip().duration - ANIMATION_FADE_TIME
      ) {
        setAnimation((prevAnimation) =>
          prevAnimation === "Talking" ? "Talking2" : "Talking"
        );
      }
    }
  });

  useEffect(() => {
    actions[animation]
      ?.reset()
      .fadeIn(mixer.time > 0 ? ANIMATION_FADE_TIME : 0)
      .play();
    return () => {
      actions[animation]?.fadeOut(ANIMATION_FADE_TIME);
    };
  }, [animation, actions]);

  const lerpMorphTarget = (target: string, value: number, speed: number = 0.1) => {
    scene.traverse((child) => {
      if (child instanceof SkinnedMesh && child.morphTargetDictionary) {
        const index = child.morphTargetDictionary[target];
        if (index === undefined || child.morphTargetInfluences === undefined) {
          return;
        }
        const influence = child.morphTargetInfluences[index];
        if (influence !== undefined) {
          child.morphTargetInfluences[index] = MathUtils.lerp(influence, value, speed);
        }
      }
    });
  };
  
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setThinkingText((thinkingText) => {
          if (thinkingText.length === 3) {
            return ".";
          }
          return thinkingText + ".";
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <group {...props} dispose={null} ref={group}>
      {loading && (
        <Html position-y={teacher === "Nanami" ? 1.6 : 1.8}>
          <div className="flex justify-center items-center -translate-x-1/2">
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex items-center justify-center duration-75 rounded-full h-8 w-8 bg-white/80">
                {thinkingText}
              </span>
            </span>
          </div>
        </Html>
      )}
      <primitive object={scene} />
    </group>
  );
}

teachers.forEach((teacher: any) => {
  useGLTF.preload(`/models/Teacher_${teacher}.glb`);
  useGLTF.preload(`/models/animations_${teacher}.glb`);
});
