import * as XLSX from "xlsx";

function LerExcel({niveisExcel, setniveisExcel}) {
    
    const handleFileUpload = (e) =>{
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, {type: "binary"});
            const sheetName = workbook.SheetNames[1];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); 
            const selectedData = parsedData.map(row => [row[0]]);
            const jsonWBS = JSON.stringify(selectedData.map(item => {
              const value = item.toString();
              const valueArray = value.split(' ');
          
              let result = {};
          
              if (valueArray.length === 1) {
              } else {
                  result.usavel = value;
              }
              
              return result;
          }));
          
        
          const parsedJsonWBS = JSON.parse(jsonWBS);
          var filteredWBS = parsedJsonWBS.filter(obj => Object.keys(obj).length !== 0);
          filteredWBS.pop()
          
        
          var filteredWBS = filteredWBS.reduce((acc, item, index) => {
            const dots = (item.usavel ?? '').trim().split('.').length - 1;
            const splitValue = (item.usavel ?? '').trim().split(' ');
        
            if (index === 0) {
                acc.projeto = {
                    ordem_projeto: splitValue.shift().replace('.', ''),
                    nome_projeto: splitValue.join(' ') 
                };
            } else if (dots === 1 || dots === 2) { 
                if (!acc.subProjeto) {
                    acc.subProjeto = [];
                }
                acc.subProjeto.push({
                    ordem_sub_projeto: splitValue.shift(),
                    nome_sub_projeto: splitValue.join(' ')
                });
            }
        
            return acc;
        }, {});

          // console.log(filteredWBS)
            setniveisExcel(filteredWBS)
        };
    }




    return (
        <div>
            <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="bg-primary50 text-on-primary mb-5  flex items-center gap-0.5 rounded-[10px] p-2 text-lg font-semibold"
            />
        </div>
    )
}    

export default LerExcel