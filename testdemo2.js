let sceneIndex = 0
let isBasicIntroduction = false
let isFullIntroduction = false


//地图场景
function createMap(engine) {
    let scene = new BABYLON.Scene(engine);


    //设置相机河灯光
    //中心旋转相机
    let camera = new BABYLON.ArcRotateCamera("Camera", Math.PI/2, Math.PI/2.5, 30, new BABYLON.Vector3(0,0,0), scene)
    camera.upperBetaLimit = Math.PI/2
    //固定相机
    //
    //let camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene)
    
    camera.attachControl(canvas, true);

    let light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, -10, 0), scene) 
    let light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, 10, 0), scene) 
     
/* 
    var academy1 = BABYLON.MeshBuilder.CreateBox("academy1",{width:1.6,height:1,depth:0.3})
    academy1.position = new BABYLON.Vector3(0,5,0) */


    var skybox = BABYLON.MeshBuilder.CreateBox("skybox", {size:10000.0}, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skybox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("sky/skybox1/skybox1", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;	
    

    //导入地图建模文件
    BABYLON.SceneLoader.Append("./", "mapModule/ChinaMap.gltf", scene, function (mapscene) {
        
        //alert("nnn")
        
        let college = new Array(),collegeBtn = new Array();
        let meshName = ["basicMap_primitive0","college1_primitive0","college2_primitive0","college3_primitive0"]
        var manager = new BABYLON.GUI.GUI3DManager(scene);
        
        var advancedTexture;
        var x,y;
        for (let i = 1; i <meshName.length; i++){
            //college[i] = scene.getMeshByID('BuildingMesh-00157')
            //college[i] = scene.getMeshByID('BuildingMesh-00064')
            college[i] = scene.getMeshByID(meshName[i]).parent;
            //college[4] = scene.getMeshByID('College1_primitive0').parent;
            

            /* alert(scene.meshes.toString());*/
            
           /*  let tmpx = college[i].position.x
            let tmpy = college[i].position.y
            let tmpz = college[i].position.z */
            
            
            //暂时
            //college[i].position = new BABYLON.Vector3(-tmpy,0.66,tmpx)

            collegeBtn[i] = new BABYLON.GUI.MeshButton3D(college[i]);
            manager.addControl(collegeBtn[i]); 
        }
        
        for (let i =1; i <meshName.length; i++){
            collegeBtn[i].pointerEnterAnimation = () => {
                if(sceneIndex == 0 && !isBasicIntroduction && !isFullIntroduction){
                    isBasicIntroduction = true;
                    advancedTexture = basicIntroduction(i,college[i]);
                }
            };
            collegeBtn[i].pointerOutAnimation = () => {
                if(sceneIndex == 0 && isBasicIntroduction){
                    isBasicIntroduction = false;
                    advancedTexture.dispose();
                }
            };
            collegeBtn[i].pointerDownAnimation = () => {
            }
            collegeBtn[i].pointerUpAnimation = () => {
            }
            collegeBtn[i].onPointerClickObservable.add(()=>{
                if(sceneIndex == 0 && !isFullIntroduction){
                    isFullIntroduction = true;
                    fullIntroduction(i);
                    
                }
                
            })
        }
        alert("地图已加载完毕")
        //introduction(i);

        //college[0].position = new BABYLON.Vector3(0,0,0)
    });
    return scene;
}
function basicIntroduction(collegeIndex,meshName){
    var myAdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var rect1 = new BABYLON.GUI.Rectangle();
    var introText;
    switch(collegeIndex){
        case 1:introText =  "学院一\n"+"xxx";break;
        case 2:introText =  "学院二\n"+"xxx";break;
        case 3:introText =  "学院三\n"+"xxx";break;
        
        default:break;
    }

    rect1.width = 0.1;
    rect1.height = "60px";
    rect1.cornerRadius = 20;
    rect1.color = "white";
    rect1.thickness = 2;
    rect1.background = "grey";
    myAdvancedTexture.addControl(rect1);

    var label = new BABYLON.GUI.TextBlock();
    label.text = introText;
    rect1.addControl(label);

    rect1.linkWithMesh(meshName);   
    rect1.linkOffsetY = -30;

    return myAdvancedTexture; 
} 
//学院介绍界面
function fullIntroduction(collegeIndex){
    var myAdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    let collegePicRoot = ["mapPic/college1.png",""];
    let fullintroText;

    switch(collegeIndex){
        case 1:fullintroText =  "\n学院名：学院一\n\n" +
        "学院介绍：xxxxxxxxxxxxxxxx\n\n"+
        "地理位置：xxxxxxxxxxxxxxxx";
        break;
        case 2:fullintroText =  "\n学院名：学院二\n\n" +
        "学院介绍：xxxxxxxxxxxxxxxx\n\n"+
        "地理位置：xxxxxxxxxxxxxxxx";
        break;
        case 3:fullintroText =  "\n学院名：学院三\n\n" +
        "学院介绍：xxxxxxxxxxxxxxxx\n\n"+
        "地理位置：xxxxxxxxxxxxxxxx";
        break;
        default:break;
    }

    //
    var viewer = new BABYLON.GUI.ScrollViewer();
    viewer.thickness = 7;
    viewer.color = "white";
    viewer.width = 0.5;
    viewer.height = 0.4;
    viewer.background = "grey";
    /* viewer.left = 300
    viewer.top = 300 */
    myAdvancedTexture.addControl(viewer);

    //学院图片
    var collegeimage = new BABYLON.GUI.Image("college1", collegePicRoot[collegeIndex-1]);
    collegeimage.width = "320px";//356
    collegeimage.height = "148px";
    collegeimage.left = 390
    collegeimage.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    myAdvancedTexture.addControl(collegeimage);


    //进入按钮
    let enterBtn = BABYLON.GUI.Button.CreateSimpleButton("but1", "进入")
    enterBtn.width = "120px"
    enterBtn.height = "45px"
    enterBtn.color = "white"
    enterBtn.cornerRadius =15
    enterBtn.background = "grey"
    enterBtn.top = 180
    enterBtn.left = 770
    enterBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    enterBtn.onPointerUpObservable.add(function () {
        //点击进入学院内
        alert("enter room")
        myAdvancedTexture.dispose();
        sceneIndex = 1;
    })
    myAdvancedTexture.addControl(enterBtn)

    //后退按钮
    let backBtn = BABYLON.GUI.Button.CreateSimpleButton("but2", "返回")
    backBtn.width = "120px"
    backBtn.height = "45px"
    backBtn.color = "white"
    backBtn.cornerRadius =15
    backBtn.background = "grey"
    backBtn.top = 180
    backBtn.left = 550
    backBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    backBtn.onPointerUpObservable.add(function () {
        //点击返回
        myAdvancedTexture.dispose();
        isFullIntroduction = false;
        return;
        
    })
    myAdvancedTexture.addControl(backBtn)
    

    //文本框按钮
    var tb = new BABYLON.GUI.TextBlock();
    tb.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
    //tb.resizeToFit = true;
    tb.paddingTop = "5%";
    tb.paddingLeft = "380px";
    tb.paddingRight = "10px"
    tb.paddingBottom = "5%";
    tb.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    tb.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    tb.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    tb.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP; 
    /* tb.left = 660
    tb.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT */
    tb.color = "white";
    tb.background = "yellow";

    tb.text = fullintroText;

    tb.fontSize = "20px";
    viewer.addControl(tb);

    
    return myAdvancedTexture;
}



function createRoom(engine) {
    let scene = new BABYLON.Scene(engine);
    
     /* var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0,1,0), scene)
    
    camera.setTarget(new BABYLON.Vector3(5, 0, 3))   */
    
  var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2.5, 16, new BABYLON.Vector3(0,0,0), scene) 
    

  camera.attachControl(canvas, true);

  // 添加一组灯光到场景
  let light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 8, 0), scene)
  //let light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene)

    
  
    
  var academyMaterial = new BABYLON.StandardMaterial("academyMaterial", scene)
  academyMaterial.diffuseColor = new BABYLON.Color3(249/256, 182/256, 6/256) 
  var mapMaterial = new BABYLON.StandardMaterial("mapMaterial", scene)
  mapMaterial.diffuseColor = new BABYLON.Color3(0.5,0.5,0.5)
  var lineMaterial = new BABYLON.StandardMaterial("lineMaterial", scene)
  lineMaterial.diffuseColor = new BABYLON.Color3(1,1,0)

  var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 20, height: 14}, scene)
  ground.position = new BABYLON.Vector3(0, 0, 0)


  var mapTest1 = BABYLON.MeshBuilder.CreateBox("mapTest1",{width: 16, height: 0.5, depth: 10})
  mapTest1.position = new BABYLON.Vector3(0, 0.25, 1)
  mapTest1.material = mapMaterial  

  var cone1 = BABYLON.MeshBuilder.CreateCylinder("cone1", {diameter:0.08,height:3.5}, scene)
  cone1.position = new BABYLON.Vector3(4,2,4)
  cone1.material = lineMaterial  
 
  var academy1 = BABYLON.MeshBuilder.CreateBox("academy1",{width:1.6,height:1,depth:0.3})
  academy1.position = new BABYLON.Vector3(4,3.5+1/2,4)
  academy1.material = academyMaterial  



   /* academy1.actionManager = new BABYLON.ActionManager(scene)
  academy1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, () => {
    alert("dd")
    sceneIndex = 1;
  }))   */
   var manager = new BABYLON.GUI.GUI3DManager(academy1.getScene());
        var college1 = new BABYLON.GUI.MeshButton3D(academy1);
        manager.addControl(college1);
      
        college1.pointerEnterAnimation = () => {
            alert("dd")
            sceneIndex = 0;
        };
        college1.pointerOutAnimation = () => {
            
        };
        college1.pointerDownAnimation = () => {
            
        }
        college1.pointerUpAnimation = () => {
            
        }
        college1.onPointerClickObservable.add(()=>{
          alert("nihao")
        }) 
  
    
  return scene;
  }
